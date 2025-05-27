import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';       
import CreateModerator from '../components/admin/CreateModerator';
import CreateSecurity from '../components/admin/CreateSecurity';
import { AuthLevelContext } from '../contexts/AuthLevelProvider';

const Administration = () => {

    const { setSession } = useContext(AuthLevelContext);
    const { setLevel } = useContext(AuthLevelContext);
    const [ createType, setCreateType] = useState(true);

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur

    const [LoggedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedOut){
            return navigate("/");
        }
    },[LoggedOut, navigate]);

    const handleClick = () => {
    localStorage.removeItem('SESSION');
    setLevel("ROLE_UNKNOWN");
    setSession(false);
    }

    const handleOnToggle = () => {
        setCreateType(!createType);
    }

    return (
        <div className='admin'>
            <h1>Panneau d'administration</h1>
            <ul className="admin-panel">
                <li><Link to="/userslist">liste des utilisateurs</Link></li>
                <li><Link to="/" onClick={handleClick}>Déconnexion</Link></li>
            </ul>
            <div className="create-panel">
                <h2>Création d'utilisateurs spéciaux :</h2>
                <div className="toggle-div">
                    <div className="create-type">
                        Modérateur
                    </div>
                    <div className="toggle-switch">
                        <input onClick={ handleOnToggle } className="toggle-input" id="toggle" type="checkbox" />
                        <label className="toggle-label" for="toggle"></label>

                    </div>
                    <div className="create-type">
                        Agent de sécurité
                    </div>
                </div>
                {createType ? <div><h3>Créer un modérateur</h3><CreateModerator /></div> : <div><h3>Créer un agent de sécurité</h3><CreateSecurity /></div>}
            </div>
        </div>
    );
};

export default Administration;