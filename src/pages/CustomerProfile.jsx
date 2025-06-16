import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthLevelContext } from '../contexts/AuthLevelProvider';
import StripeContainer from '../components/StripeContainer';
import { ErrorPanelContext } from '../contexts/ErrorPanelProvider';
import PdfReader from '../components/customer/PdfReader';
import transformToDate from '../components/TransformToDate';

/** Affiche les informations de l'utilisateur, ses tickets et permet de se déconnecter. Si l'utilisateur n'est pas connecté, il est redirigé vers la page d'accueil.
 * @returns {JSX.Element} Le composant CustomerProfile.
 */
const CustomerProfile = () => {
    
    // On initialise le state pour stocker les informations de l'utilisateur et les tickets
    const [user, setUser] = useState([]);
    const [tickets, setTickets] = useState([])

    // On initialise le state pour afficher le paiement
    const [ pay, setPay ] = useState(false);
    const [ ticketId, setTicketId ] = useState(null);

    // On met en place les contextes pour gérer la session et les autorisations et pour afficher le paiement du bon ticket
    const { setSession } = useContext(AuthLevelContext);
    const { setLevel } = useContext(AuthLevelContext);
    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);


    // On crée la requête pour récupérer les informations de l'utilisateur
    useEffect(() => {

        let requestIsOk = false;

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/customers`,
                {
                method : "GET",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                }
            }) 
            .then((response) => {
                if(response.ok === true) {
                    requestIsOk = true;
                }
                return response.json()
            })
            .then((data) => {
                if(requestIsOk === true) {
                    setUser(data)
                    setTickets(data.tickets);
                } else {
                    setErrorType(0);
                    setErrorMessage(data.error);
                }

            })
            .catch((error) => {
                setErrorType(0);
                setErrorMessage(error.toString());
            });
    }, [setErrorMessage, setErrorType]);

    // Fonction pour passer au paiement
    const handleClickPay = (ticketIdFromRequest) => (e) => {
        e.preventDefault();
        setTicketId(ticketIdFromRequest);
        setPay(!pay);
    }

    
    // Fonction pour se déconnecter
    const handleClick = () => {
        localStorage.removeItem("SESSION");
        setSession(false);
        setLevel("ROLE_UNKNOWN");
    }

    // Si le state de payment est vrai ainsis que l'id du ticket à payer n'est pas null
    if(pay && ticketId !== null) {
        return (
            <div className="user">
                <button onClick={handleClickPay(null)}>Revenir au profil</button>
                <StripeContainer ticketId={ ticketId } user={ user }/>
            </div>

        )
    }

    return (
        <div className="user">
            <div className="user__panel">
                <h2>Profil de {user.firstName} {user.lastName}</h2>
                <button onClick={handleClick}>Déconnexion</button>
                <div className="user__info">
                    <h3>Vos informations:</h3>
                    <ul>
                        <li>
                            { user.profileIsValidate ? "Profil validé" : "Profil en attente de validation"}
                        </li>
                        <li>
                            adresse e-mail : {user.username}
                        </li>
                        <li>
                            Numéro de téléphone : {user.phoneNumber}
                        </li>
                        <li>
                            profil créé {user.createdDate ? transformToDate(user.createdDate) : ""}
                        </li>
                    </ul>
                    <h3>Vos tickets:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre de places</th>
                                <th>Payé le</th>
                                <th>Etat du ticket</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>
                                        {ticket.howManyTickets} 
                                    </td>
                                    <td>
                                        {user.profileIsValidate ? "" : "Profil en attente de validation" }
                                        {user.profileIsValidate && !ticket.ticketIsPayed ? <button onClick={handleClickPay(ticket.id)} className="paybutton"> Procéder au paiement</button> : ""}
                                        { ticket.ticketIsPayed ? transformToDate(ticket.ticketCreatedDate) : ""}
                                    </td>
                                    <td>
                                        {ticket.ticketIsPayed ? <PdfReader pdfUrl={ ticket.ticketUrl } /> : " non payé(s)"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;