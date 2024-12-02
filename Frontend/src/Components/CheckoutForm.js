import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Your payment was successful!");
          break
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        //return_url: "http://localhost:3000/payment-success",
      },
      redirect:'if_required'
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.


    if(response.error){
      if (response.error.type === "card_error" || response.error.type === "validation_error") {
        setMessage(response.error.message);
        setIsLoading(false);
      } else {
        setMessage("An unexpected error occurred.");
        setIsLoading(false);
      }
    } else {
        setIsLoading(false);
        props.paymentSuccess(response.paymentIntent.id);

        
    }
   
    
    

  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    
      <form id="payment-form" onSubmit={handleSubmit} className="payment-form">
        <div id="button-text" style={{paddingBottom:"30px", textAlign:'center',color:"black",fontWeight:'bolder'}}>Payment Checkout </div>
        <PaymentElement id="payment-element" options={paymentElementOptions}/>
        <button disabled={isLoading || !stripe || !elements} id="submit" style={{ backgroundColor: "#12393a"}}>
          <span id="button-text" style={{color:"white"}}>
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message" style={{color:"red"}}>{message}</div>}
       
      </form>
     
   
   
  
  );
}