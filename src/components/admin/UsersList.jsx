import React, { useContext, useEffect, useState } from 'react';
import CustomerTable from './CustomerTable';
import ModeratorTable from './ModeratorTable';
import SecurityTable from './SecurityTable';
import { AdminPageContext } from '../../contexts/AdminPageProvider';
import PageProvider from '../../contexts/PageProvider';

/** Composant pour afficher la liste des utilisateurs et permettre leur gestion.
 * @returns {JSX.Element} La liste des utilisateurs avec des options de gestion.
 */
const UsersList = () => {
    
    // On met en place les useState pour gérer la construction des différents tableaux
    const [customers, setCustomer] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [securities, setSecurity] = useState([]);

    const [loading, setLoading] = useState(true);

    // On met en place le useState qui va gérer quel tableau afficher
    const [userType, setUserType] = useState("CUSTOMER");

    // On met en place le context pour gérer quel page de l'administration afficher
    const { adminPage, setAdminPage } = useContext(AdminPageContext);

    // On met en place l'appel à l'API pour récupérer les photos à valider
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`,
                {
                method : "GET",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                }
            }) 
            .then((response) => response.json())
            .then((data) => {
                const usersCustomer = data.filter(user => user.role === "ROLE_USER");
                const usersModerator = data.filter(user => user.role === "ROLE_MODERATOR");
                const usersSecurity = data.filter(user => user.role === "ROLE_SECURITY");
                setCustomer(usersCustomer);
                setModerators(usersModerator);
                setSecurity(usersSecurity);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    // On crée les fonctions pour choisir le tableau à afficher
    const handleOnClickOnCustomer = () => {
        setUserType("CUSTOMER");
    }
    const handleOnClickOnModerator = () => {
        setUserType("MODERATOR");
    }
    const handleOnClickOnSecurity = () => {
        setUserType("SECURITY");
    }

    // On crée la fonction pour choisir quelle page de l'administration afficher
    const handleClickChangeAdminPage = () => {
        setAdminPage(!adminPage);
    }


    return (
        <div className="admin-user-list">
            <h2>Liste des utilisateurs</h2>
            <button onClick={handleClickChangeAdminPage}>Retour au panneau d'administration</button>
            <div className="user-type">
                <strong>Type d'utilisateurs : </strong>
                <span onClick={handleOnClickOnCustomer}> Clients </span> | 
                <span onClick={handleOnClickOnModerator}> Modérateurs </span> | 
                <span onClick={handleOnClickOnSecurity}> Agents de sécurité </span>
            </div>
            <div className="user-list-table">
                {userType === "CUSTOMER" ? <PageProvider><CustomerTable customers={customers} /></PageProvider> : ""}
                {userType === "MODERATOR" ?<PageProvider><ModeratorTable moderators={moderators} /></PageProvider> : ""}
                {userType === "SECURITY" ?<PageProvider><SecurityTable securities={securities} /></PageProvider> : ""}
            </div>
        </div>
    );
};

export default UsersList;