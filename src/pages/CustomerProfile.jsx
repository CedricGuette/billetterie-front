import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLevelContext } from '../contexts/AuthLevelProvider';

/** Composant CustomerProfile qui affiche le profil de l'utilisateur connecté et ses tickets.
 * @returns {JSX.Element} Le composant CustomerProfile.
 * @description Affiche les informations de l'utilisateur, ses tickets et permet de se déconnecter. 
 * Si l'utilisateur n'est pas connecté, il est redirigé vers la page d'accueil.
 */
const CustomerProfile = () => {
    
    // On initialise le state pour stocker les informations de l'utilisateur et les tickets
    const [user, setUser] = useState([]);
    const [tickets, setTickets] = useState([])
    const { setSession } = useContext(AuthLevelContext);
    const { setLevel } = useContext(AuthLevelContext);
    const url = "/pay/";


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/customers`,
                {
                method : "GET",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                }
            }) 
            .then((response) => response.json())
            .then((data) => {
                setUser(data)
                setTickets(data.tickets);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données utilisateur :", error);
            });
    }, []);

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur
    const [LoggedOut, setLoggedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedOut){
            return navigate("/");
        }
    },[LoggedOut, navigate]);
    

    const handleClick = () => {
        localStorage.removeItem('SESSION');
        setSession(false);
        setLevel("ROLE_UNKNOWN");
        setLoggedOut(true);
    }

    return (
        <div>
            <h2>Profil de {user.firstName} {user.lastName}</h2>
            <ul>
                <li>
                    adresse e-mail : {user.username}
                </li>
                <li>
                     profil créé le {user.createdDate}
                </li>
                <li>
                    { user.profileIsValidate ? "Profil validé" : "Profil en attente de validation"}
                </li>
                <li>
                    Numéro de téléphone : {user.phoneNumber}
                </li>
                {tickets.map((ticket) => (
                    <li key={ticket.id}>
                        <strong>
                        {ticket.howManyTickets} tickets 
                        {ticket.ticketIsPayed ? <a href= {`${process.env.REACT_APP_BACKEND_URL + ticket.ticketUrl}`}> Accedez à votre ticket</a> : " non payé(s)"}
                        {user.profileIsValidate && !ticket.ticketIsPayed ? ( <Link to={ url + ticket.id }> Procéder au paiement</Link>) : "" }

                        </strong>
                    </li>                ))}
                <li>
                    <Link to="/" onClick={handleClick}>Déconnexion</Link>
                </li>
            </ul>
        </div>
    );
};

export default CustomerProfile;