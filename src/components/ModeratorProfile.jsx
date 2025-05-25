import React, { useEffect, useState } from 'react';
import ModerationButton from './ModerationButton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthLevelContext } from './AuthLevelProvider';
import { useNavigate } from 'react-router-dom';

const ModeratorProfile = () => {
    const [photos, setUser] = useState([]);
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
        fetch("http://localhost:8080/api/moderators",
                {
                method : "GET",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                }
            }) 
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
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
                
                {photos.map((photo) => (
                    <li key={photo.id}>
                        <img src = {`http://localhost:8080${photo.url}`} alt={`Photo ${photo.id}`} style={{ maxWidth: '200px', display: 'block', marginTop: '8px' }} /> - <ModerationButton id={photo.id} />
                    </li> ))}
            </ul>
        </div>
    );
};

export default ModeratorProfile;