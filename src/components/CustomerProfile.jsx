import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLevelContext } from './AuthLevelProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const CustomerProfile = () => {
    
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([])
    const { session, setSession } = useContext(AuthLevelContext);
    const { level, setLevel } = useContext(AuthLevelContext);
    const url = "/pay/";


    useEffect(() => {
        fetch("http://localhost:8080/api/customers",
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
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur
    const [LoggedOut, setLoggedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedOut){
            return navigate("/");
        }
    },[LoggedOut]);
    

    const handleClick = () => {
        localStorage.removeItem('SESSION');
        setSession(false);
        setLevel("ROLE_UNKNOWN");
        setLoggedOut(true);
    }

    if (loading) return <div>Loading...</div>;

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
                        {ticket.ticketIsPayed ? <a href= {`http://localhost:8080/${ticket.ticketUrl}`}> Accedez à votre ticket</a> : " non payé(s)"}
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