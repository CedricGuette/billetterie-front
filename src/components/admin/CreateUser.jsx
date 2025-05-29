import React from 'react';
import { useContext, useState } from 'react';
import CreateModerator from './CreateModerator';
import CreateSecurity from './CreateSecurity';
import { AuthLevelContext } from '../../contexts/AuthLevelProvider';
import { AdminPageContext } from '../../contexts/AdminPageProvider';

/**Composant pour créer un modérateur ou un agent de sécurité.
 * @returns {JSX.Element} Un formulaire pour créer un modérateur ou un agent de sécurité.
 */
const CreateUser = () => {

    // On crée les contexts pour gérer la page d'administration à afficher et la déconnexion
    const { setSession } = useContext(AuthLevelContext);
    const { setLevel } = useContext(AuthLevelContext);
    const { adminPage, setAdminPage } = useContext(AdminPageContext);

    // On crée un useState pour choisir quel type d'utilisateur créer
    const [ createType, setCreateType] = useState(true);
   
    // Fonction pour la déconnexion
    const handleClick = () => {
        localStorage.removeItem('SESSION');
        setLevel("ROLE_UNKNOWN");
        setSession(false);
    }

    // Fonction pour changer de page d'administration
    const handleClickChangeAdminPage = () => {
        setAdminPage(!adminPage);
    }

    // Fonction pour changer de type d'utilisateur à créer
    const handleOnToggle = () => {
        setCreateType(!createType);
    }

    return (
        <div className='admin'>
            <h1>Panneau d'administration</h1>
            <ul className="admin__panel">
                <li><button onClick={handleClickChangeAdminPage}>liste des utilisateurs</button></li>
                <li><button onClick={handleClick}>Déconnexion</button></li>
            </ul>
            <div className="create-panel">
                <h2>Création d'utilisateurs spéciaux :</h2>
                <div className="toggle-div">
                    <div className="create-type">
                        Modérateur
                    </div>
                    <div className="toggle-switch">
                        <input onClick={ handleOnToggle } className="toggle-input" id="toggle" type="checkbox" />
                        <label className="toggle-label" htmlFor="toggle"></label>
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

export default CreateUser;