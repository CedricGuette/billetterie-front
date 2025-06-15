import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorPanelContext } from "../../contexts/ErrorPanelProvider";

const Return = () => {

    const { sessionId, ticketId } = useParams();

    const [ response, setResponse ] = useState(false);

    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);

    const navigate = useNavigate();


    useEffect(() => {

        let requestIsOk = false;

        fetch(process.env.REACT_APP_BACKEND_URL +'/api/stripe/checkout/validation/' + sessionId + "/" + ticketId, {
            method: 'GET',
            headers : { 
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
        }})
        .then((res) => {
            if(res.ok === true) {
                requestIsOk = true;
            }
            return res.json()
        })
        .then((data) => {
            if(requestIsOk === true) {
                setErrorType(2);
            } else {
                setErrorType(0);
            }
            setErrorMessage(data.checkoutStatus)
            setResponse(true);
        })
    },[response, setResponse, sessionId, ticketId, setErrorMessage, setErrorType])

    useEffect(() => {
        const redirect = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(redirect);
    },[response, navigate])

    return (
    <div className="ticket-shop">
        <h3>Veuillez patienter vous allez être redirigé dans quelques secondes...</h3>
    </div>)



}

export default Return;