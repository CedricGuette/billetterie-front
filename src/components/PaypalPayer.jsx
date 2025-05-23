import React, { useEffect, useRef } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";


const initialOptions = {
  "client-id": "AdUTDsa7kUYMW2Ezy54frYy71PaRtrTuyAmZi8mQxLs9SjVgMeEOdgmXjPAi9ZF44ef7arG1p3nOkDgb",
  currency: "Euro",
  intent: "capture",
};

const PaypalPayer = () => {

  const { ticket } = useParams();
  const [data, setUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/customers/cartprice/" + ticket,
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
}, []);

    return (
        <div>       
          <PayPalScriptProvider options={initialOptions}>
                <Checkout price = { data } ticketIdString = { ticket.toString } ticketId={ ticket }/>
          </PayPalScriptProvider>
        </div>
    );
};

export default PaypalPayer;
