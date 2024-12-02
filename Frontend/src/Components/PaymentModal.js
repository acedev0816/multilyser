import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, notification } from 'antd';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Loader from "./Loader";
import { useDispatch } from 'react-redux';
import {paymentConfirmSuccess} from '../redux/protectedRouteSlice'
const stripePromise = loadStripe("pk_test_51OEzZKIvJP3RAcZiocCWzcIQh2YQJMbits0hDBunI9f2oEnwXMlwVaf4LFD1RJpGLXr1qwzHvO5Q9RO9ux9vF7Y600CdZS01GR");

export default function PaymentModal(props){
    const [clientSecret, setClientSecret] = useState("");
    const [open, setOpen]= useState(false)
    const [amount, setAmount]= useState("")    
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch();
    const navigate=useNavigate();


    
    useEffect(()=>{
        setOpen(props.open)
        //get client secret token from server when modal is opened
        if(props.open===true){
            fetch("https://app.multilyser.com/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                            { 
                                count:props.urls.length,
                                slider:props.slider,
                    
                             }
                      ),
              })
                .then((res) => res.json())
                .then((data) => {
                  setClientSecret(data.clientSecret)
                  setAmount(data.amount)
                  setLoading(false);
              });
        }
    
    },[props.open,props.slider,props.urls,setOpen,setClientSecret,setAmount,setLoading])


    const onPaymentSuccess=(payment_intent_id)=>{


        setClientSecret("");
        props.openModal(false)

        
        fetch("https://app.multilyser.com/get-websites-summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                        { 
                            urls:props.urls,
                            slider:props.slider,
                            question:props.question,
                            email:props.email,
                            payment_intent:payment_intent_id,
                            model:props.model
                
                         }
                  ),
        })
            .then((res) => res.json())
            .then((data) => {
           
            //openNotification("Payment Status",`Your payment was ${data.payment_status}`)
            dispatch(paymentConfirmSuccess());
            
            navigate('/payment-success')
            
        });
    }
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
   
    const handleCancel = () => {
        props.openModal(false);
        setClientSecret("");
    };

    return(
            <Modal
                open={open}
                centered
                title={ clientSecret&& (`Amount:${amount}$`)}
                onCancel={handleCancel}
                width={800}
                footer={null}
                className='payment-modal'
  
            >
            {contextHolder}
            {
                    clientSecret ? (

                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm paymentSuccess={onPaymentSuccess}/>
                        </Elements>
                    ) : <Loader />
            }
            </Modal>
    );
}