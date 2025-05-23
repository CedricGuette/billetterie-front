import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLevelContext } from './AuthLevelProvider';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';       
import CreateModerator from './CreateModerator';
import CreateSecurity from './CreateSecurity';
import CreateAdmin from './CreateAdmin';

const Administration = () => {

    const { session, setSession } = useContext(AuthLevelContext);
    const { level, setLevel } = useContext(AuthLevelContext);

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
    setLevel("ROLE_UNKNOWN");
    setSession(!session);
    }

    return (
        <div>
            <h1>Panneau d'administration</h1>
            <ul>
                <li><Link to="/userslist">liste des utilisateurs</Link></li>
                <li><Link to="/" onClick={handleClick}>Déconnexion</Link></li>
            </ul>
            <h2>Créer un modérateur</h2>
            <CreateModerator />
            <h2>Créer un agent de sécurité</h2>
            <CreateSecurity />
        </div>
    );
};

export default Administration;