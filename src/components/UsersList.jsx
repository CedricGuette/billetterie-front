import React, { useEffect, useState } from 'react';
import ModerationButton from './ModerationButton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthLevelContext } from './AuthLevelProvider';
import { useNavigate } from 'react-router-dom';
import DeleteUserButton from './DeleteUserButton';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // On récupère le niveau d'authentification de l'utilisateur
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

    // On met en place l'appel à l'API pour récupérer les photos à valider
    useEffect(() => {
        fetch("http://localhost:8080/api/admin/users",
                {
                method : "GET",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                }
            }) 
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // On met en place la fonction de déconnexion
    const handleClick = () => {
    localStorage.removeItem('SESSION');
    setLevel("ROLE_UNKNOWN");
    setSession(false);
    setLoggedOut(true);
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Panneau de modérations</h2>
            <Link to="/" onClick={handleClick}>Déconnexion</Link>
            <ul>
                
                {users.map((user) => (
                    <li key={user.id}>
                        {user.role.substr(5) } - {user.username} - <strong>{user.firstName} {user.lastName}</strong>  - <DeleteUserButton id={user.id} />
                    </li> ))}
            </ul>
        </div>
    );
};

export default UsersList;