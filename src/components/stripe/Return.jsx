import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Return = () => {

    const { sessionId, ticketId } = useParams();

    const [ response, setResponse ] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL +'/api/stripe/checkout/validation/' + sessionId + "/" + ticketId, {
            method: 'GET',
            headers : { 
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
        }})
        .then((res) => res.json())
        .then((data) => setResponse(data.checkoutStatus))
    },[response, setResponse, sessionId, ticketId])

    useEffect(() => {
        const redirect = setTimeout(() => {
            navigate("/");
        }, 5000);

        return () => clearTimeout(redirect);
    },[response])

    return (
        <div>
            {response ? response : ""}
        </div>
    )



}

export default Return;