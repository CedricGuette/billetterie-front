import React, { useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "../components/paypal/Checkout";
import { useParams } from "react-router-dom";


const initialOptions = {
  "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
  currency: "Euro",
  intent: "capture",
};

/**
 * Composant PaypalPayer pour gérer le paiement via PayPal.
 * 
 * @returns {JSX.Element} Le composant de paiement PayPal.
 * @description Ce composant récupère le prix du panier d'un utilisateur et l'affiche dans le composant Checkout pour le paiement via PayPal.
 */
const PaypalPayer = () => {

  const { ticket } = useParams();
  const [data, setUser] = React.useState([]);
  const [setLoading] = React.useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/customers/cartprice/` + ticket,
            {
            method : "GET",
            headers : { 
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
            }
        }) 
        .then((response) => response.json())
        .then((data) => {
            setUser(data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
}, [setLoading, ticket]);

    return (
        <div>       
          <PayPalScriptProvider options={initialOptions}>
                <Checkout price = { data } ticketIdString = { ticket.toString } ticketId={ ticket }/>
          </PayPalScriptProvider>
        </div>
    );
};

export default PaypalPayer;
