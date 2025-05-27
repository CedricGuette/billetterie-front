import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthLevelContext } from '../../contexts/AuthLevelProvider';
import { useNavigate } from 'react-router-dom';
import DeleteUserButton from './DeleteUserButton';

/** Composant pour afficher la liste des utilisateurs et permettre leur gestion
 * @returns {JSX.Element} La liste des utilisateurs avec des options de gestion.
 * @description Ce composant récupère la liste des utilisateurs depuis l'API et permet à un administrateur de supprimer des utilisateurs.
 */
const UsersList = () => {
    const [customers, setCustomer] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [securities, setSecurity] = useState([]);
    const [loading, setLoading] = useState(true);

    // On récupère le niveau d'authentification de l'utilisateur
    const { setSession } = useContext(AuthLevelContext);
    const { setLevel } = useContext(AuthLevelContext);

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur
    const [LoggedOut, setLoggedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedOut){
            return navigate("/");
        }
    },[LoggedOut, navigate]);

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

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <Link to="/">Retour au panneau d'administration</Link>
            <h2>Liste des clients</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Numéro de téléphone</th>
                        <th>Date de création</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((user) => (
                        <tr key={user.id}>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.firstName}
                            </td>
                            <td>
                                {user.lastName} 
                            </td>
                            <td>
                                {user.phoneNumber} 
                            </td>
                            <td>
                                {user.createdDate} 
                            </td>
                            <td>
                                <DeleteUserButton id={user.id} />
                            </td>
                        </tr>
                     ))}
                </tbody>
            </table>
            <h2>Liste des modérateurs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Prénom</th>
                        <th>Date de création</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {moderators.map((user) => (
                        <tr key={user.id}>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.firstName}
                            </td>
                            <td>
                                {user.createdDate} 
                            </td>
                            <td>
                                <DeleteUserButton id={user.id} />
                            </td>
                        </tr>
                     ))}
                     </tbody>
            </table>
            <h2>Liste des agents de sécurité</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Prénom</th>
                        <th>Date de création</th>
                        <th>Action</th>
                    </tr>
                </thead>
                 <tbody>
                    {securities.map((user) => (
                        <tr key={user.id}>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.firstName}
                            </td>
                            <td>
                                {user.createdDate} 
                            </td>
                            <td>
                                <DeleteUserButton id={user.id} />
                            </td>
                        </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    );
};

export default UsersList;