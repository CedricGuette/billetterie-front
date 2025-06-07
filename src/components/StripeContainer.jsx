import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProvider } from "@stripe/react-stripe-js";
import CheckoutForm from "./stripe/CheckoutForm";

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripe = loadStripe(PUBLIC_KEY);


const StripeContainer = ({ ticketId, user }) => {

    // Requête pour créer une session de paiement stripe
    const fetchClientSecret = () => {

        return fetch(process.env.REACT_APP_BACKEND_URL +'/api/stripe/checkout/' + ticketId, {
            method: 'POST',
            headers : { 
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
            }})
            .then((response) => response.json())
            .then((json) => json.checkoutSessionClientSecret)
        };
    return(
        <CheckoutProvider stripe={stripe} options={{fetchClientSecret}}>
            <CheckoutForm email={ user.username }/>
        </CheckoutProvider>
    );
};

export default StripeContainer;