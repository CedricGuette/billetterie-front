import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


/**
 * Composant Checkout qui gère le processus de paiement avec PayPal.
 * 
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.price - Le prix du billet à payer.
 * @param {string} props.ticketIdString - L'identifiant du billet sous forme de chaîne.
 * @param {number} props.ticketId - L'identifiant du billet sous forme numérique.
 * @returns {JSX.Element} Le composant Checkout.
 */
const Checkout = ({ price , ticketIdString, ticketId }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: `${price}.00`,
                        currency: "EUR"
                    },
                    soft_descriptor: ticketIdString,
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {

            try {
            const response = fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tickets/` + ticketId, {
                method: "PATCH",
                headers: {
                 
                },
                body: {}
                
            })
            .then((res) => {
                if (res.ok) {
                    window.location.href = "/";
            }
            if (!response.ok) {
                throw new Error("Erreur lors de la validation du paiement, veuillez réessayer.");
            }
            });
            } catch (error) {
            console.error(error);
        }
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD"> USD</option>
                            <option value="EUR"> Euro</option>
                    </select>

                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout;
