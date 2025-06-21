import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorPanelContext } from "../../contexts/ErrorPanelProvider";


/**
 * Composant Return qui gère le retour de la page de paiement Stripe.
 * Il valide le ticket et affiche un message de redirection.
 * 
 * @returns {JSX.Element} Le composant Return.
 */
const Return = () => {

    // On récupère l'identifiant du ticket depuis les paramètres de l'URL
    const { ticketId } = useParams();

    // On initialise le state pour savoir si la requête a été effectuée
    const [ response, setResponse ] = useState(false);

    // On met en place le contexte pour afficher les messages d'erreur
    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);

    const navigate = useNavigate();

    // On effectue une requête pour valider le ticket et récupérer son statut
    useEffect(() => {

        let requestIsOk = false;

        fetch(process.env.REACT_APP_BACKEND_URL +'/api/stripe/checkout/validation/' + ticketId, {
            method: 'GET',
            headers : { 
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
        }})
        .then((response) => {
            if(response.ok === true) {
                requestIsOk = true;
            }
            return response.json()
        })
        .then((data) => {
            if(requestIsOk === true) {
                setErrorType(2);
                setErrorMessage(data.checkoutStatus)
            } else {
                setErrorType(0);
                setErrorMessage(data.error)
            }
            setResponse(true);
        })
    },[response, setResponse, ticketId, setErrorMessage, setErrorType])

    // On redirige l'utilisateur vers la page d'accueil après 5 secondes
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