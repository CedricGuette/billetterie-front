import React, { useEffect, useState } from 'react';
import PayButton from './PayButton';
import {PaymentElement, useCheckout} from '@stripe/react-stripe-js';

const CheckoutForm = ({ email }) => {

  const [ error, setError] = useState(null)

    const handleSetMail = () => {
    checkout.updateEmail(email).then((result) => {
      if (result.error) {
        setError(result.error);
      }
    })
  };

  useEffect(() => {
    handleSetMail();
    // eslint-disable-next-line
  },[])

  const checkout = useCheckout();
  return (
    <form>
        <pre>
            Total à régler: {checkout.total.total.amount}
        </pre>
      <PaymentElement options={{layout: 'accordion'}}/>
      <PayButton />
      {error ? error : ""}
    </form>
  )
};

export default CheckoutForm;