import React, { useState } from 'react';
// import './Checkout.css';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


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

            const name = details.payer.name.given_name;
            try {
            const response = fetch("http://localhost:8080/api/tickets/" + ticketId, {
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
