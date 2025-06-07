
const CheckoutResult = () => {

    const isCheckoutOk = () => {
    return fetch(process.env.REACT_APP_BACKEND_URL +'/api/stripe/checkout/status', {method: 'GET'})
    .then((response) => response.json())
    .then((json) => json.checkoutIsOk)
    }

    return ("")
};

export default CheckoutResult;