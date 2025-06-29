import React, { useContext } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProvider } from "@stripe/react-stripe-js";
import CheckoutForm from "./stripe/CheckoutForm";
import { ErrorPanelContext } from "../contexts/ErrorPanelProvider";

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripe = loadStripe(PUBLIC_KEY);

/**
 * Composant qui va gérer l'appel de la requête pour lancer une session de paiement avec Stripe.
 * @param {string} ticketId identifiant qui permet de récupérer toutes les informations relative au ticket à payer
 * @param {object} user objet de l'utilisateur pour préremplir la requête de session
 * @returns {JSX.Element} Le composant de paiment.
 */
const StripeContainer = ({ ticketId, user }) => {

    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);

    // Requête pour créer une session de paiement stripe
    const fetchClientSecret = () => {

        let requestIsOk = false;

        return fetch(process.env.REACT_APP_BACKEND_URL +'/api/stripe/checkout/' + ticketId, {
            method: 'POST',
            headers : { 
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
            }})
            .then((response) => {
                if(response.ok === true) {
                    requestIsOk = true;
                }
                return response.json()})
            .then((data) => {
                if(requestIsOk === true){
                    return data.checkoutSessionClientSecret
                } else {
                    setErrorType(0);
                    setErrorMessage(data.error);
                }
            })
        };
    return(
        <CheckoutProvider stripe={stripe} options={{fetchClientSecret}}>
            <CheckoutForm email={ user.username }/>
        </CheckoutProvider>
    );
};

export default StripeContainer;