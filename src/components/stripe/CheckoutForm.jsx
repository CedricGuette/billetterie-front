import React from 'react';
import EmailInput from './EmailInput';
import PayButton from './PayButton';
import {PaymentElement, useCheckout} from '@stripe/react-stripe-js';

const CheckoutForm = ({ email }) => {
  const checkout = useCheckout();
  return (
    <form>
      <EmailInput emailPreview={ email }/>
        <pre>
            Total à régler: {checkout.total.total.amount}
        </pre>
      <PaymentElement options={{layout: 'accordion'}}/>
      <PayButton />
    </form>
  )
};

export default CheckoutForm;