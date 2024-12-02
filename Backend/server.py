import json
import stripe
from scrape_new import scrapeDomain, write_csv
from datetime import datetime
from rq import Queue
from worker import conn
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv
from app import create_app


load_dotenv()
q = Queue(connection=conn)

# This is your test secret API key.
stripe.api_key = os.getenv("STRIPE_API_KEY")
print(os.getenv("STRIPE_API_KEY"))

# app = Flask(__name__, static_folder='public', static_url_path='', template_folder='public')
app = create_app()
CORS(app)






def calculate_order_amount(domain_count,slider):

    out_token_account=1 #1=1k token
    token_amount_per_page=32/48  #unit is k
    token_amount_per_domian=slider*token_amount_per_page+out_token_account #unit is k
    price_per_1k_token= 0.01 # unit is $ and per 1k token

    total_price= domain_count*(token_amount_per_domian)*price_per_1k_token*3 #unit 1usd
    
    return total_price*100

# def calculate_order_amount(data):
#     domain_count=len(str(data["urls"]).split('\n'))
#     print(domain_count)
#     slider=data["slider"]
#     out_token_account=1 #1=1k tokne
#     token_account_per_page=32/48  #unit is k
#     token_account_per_domian=slider*token_account_per_page+out_token_account #unit is k
#     price_per_1k_token= 0.01 # unit is $ and per 1k token

#     total_price= domain_count*(token_account_per_domian)*price_per_1k_token*3 #unit 1usd
    
#     return total_price*100


def calculate_gpt3_token_price(domain_count,slider):
    token_amount_per_page=32/48  #unit is k
    input_token_amount_per_domian=slider*token_amount_per_page #unit is k
    print("input token:",input_token_amount_per_domian)
    if input_token_amount_per_domian>13:

        out_put_token_amount_per_domain=2
    else :
        out_put_token_amount_per_domain=1

    print("output token:",out_put_token_amount_per_domain)
    total_price= domain_count*((input_token_amount_per_domian)*0.001+(out_put_token_amount_per_domain)*0.002)*3 
    return total_price*100

def check_payment_status(payment_intent_id):
    try:
        # Retrieve the PaymentIntent from Stripe
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)

        # Check the status of the PaymentIntent
        payment_status = payment_intent['status']
        payment_created=payment_intent['created']
        return payment_status,payment_created
    except stripe.error.StripeError as e:
        # Handle any errors that may occur during the API request
        print(f"Error: {e}")
        return None



@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        print(data)
        #updated front end part
        amount=calculate_order_amount(data["count"],data["slider"])
        if(amount<50):
            amount=50

                
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=int(amount),
            currency='usd',
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret'],
            'amount':str(format(amount/100,'.2f'))
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

@app.route('/calculate_price', methods=['POST'])
def calculate_price():
    try:

        data = json.loads(request.data)
        print(data)

        amount=calculate_order_amount(data["count"],data["slider"])
       
        if(amount<50):
            amount=50


        return jsonify({
            'amount':str(format(amount/100,'.2f'))
        })

    except Exception as e:
        return jsonify(error=str(e)), 403

@app.route('/get-websites-summarize', methods=['POST'])
def summarize_website():
    try:
        data = json.loads(request.data)
        print("data from client",data["urls"],data["slider"])

        domain_array=data['urls']
        page_count=int(data['slider'])
        question= data['question']
        email= data['email']
        payment_intent_id=data["payment_intent"]
        payment_status,payment_created=check_payment_status(payment_intent_id)

        if payment_status:
            current_time=datetime.now()
            payment_created_time = datetime.fromtimestamp(payment_created)
            interval_time=(current_time-payment_created_time).total_seconds()
            print("lasted:",interval_time)

            if payment_status=="succeeded":
                file_path=f"{payment_intent_id}.csv"
                write_csv(file_path,['Url', 'Redirected Url', 'Response Code', 'Depth-slider', 'Question', 'Answer'])
                length=len(domain_array)
                isEnd=False
                i=0
                for domain in domain_array:
                    i+=1
                    if i==length:
                        isEnd=True
                    job = q.enqueue_call(
                        func=scrapeDomain, args=(domain,page_count,question, email ,payment_intent_id, isEnd), result_ttl=5000
                    )
                    print(job.get_id())
                
                # job received and loged to database
                
                
                return jsonify({"job_id":job.get_id(),"payment_status":payment_status})

        
            else:
                return jsonify({"payment_status":f"Invalid payment!"})

    except Exception as e:
        return jsonify(error=str(e)), 403



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4242)