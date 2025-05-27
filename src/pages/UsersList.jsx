import React, { useEffect, useState } from 'react';
import CustomerTable from '../components/admin/CustomerTable';
import ModeratorTable from '../components/admin/ModeratorTable';
import SecurityTable from '../components/admin/SecurityTable';
import { Link } from 'react-router-dom';

/** Composant pour afficher la liste des utilisateurs et permettre leur gestion
 * @returns {JSX.Element} La liste des utilisateurs avec des options de gestion.
 * @description Ce composant récupère la liste des utilisateurs depuis l'API et permet à un administrateur de supprimer des utilisateurs.
 */
const UsersList = () => {
    
    const [customers, setCustomer] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [securities, setSecurity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState("CUSTOMER");

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

    const handleOnClickOnCustomer = () => {
        setUserType("CUSTOMER");
    }

        const handleOnClickOnModerator = () => {
        setUserType("MODERATOR");
    }

        const handleOnClickOnSecurity = () => {
        setUserType("SECURITY");
    }

    return (
        <div className="admin-user-list">
            <h2>Liste des utilisateurs</h2>
            <Link to="/">Retour au panneau d'administration</Link>
            <div className="user-type">
                <strong>Type d'utilisateurs : </strong>
                <span onClick={handleOnClickOnCustomer}> Clients </span> | 
                <span onClick={handleOnClickOnModerator}> Modérateurs </span> | 
                <span onClick={handleOnClickOnSecurity}> Agents de sécurité </span>
            </div>
            <div className="user-list-table">
                {userType === "CUSTOMER" ? <CustomerTable customers={customers} /> : ""}
                {userType === "MODERATOR" ?<ModeratorTable moderators={moderators} /> : ""}
                {userType === "SECURITY" ?<SecurityTable securities={securities} /> : ""}
            </div>
        </div>
    );
};

export default UsersList;