import React, { useEffect, useState, useContext } from 'react';
import ValidationPhotoItem from '../components/moderator/VerificationPhotoItem';
import ModeratorProvider from '../contexts/ModeratorProvider';
import { AuthLevelContext } from '../contexts/AuthLevelProvider';

const ModeratorProfile = () => {
    const [photos, setUser] = useState([]);

    const { setSession } = useContext(AuthLevelContext);
    const { setLevel } = useContext(AuthLevelContext);

    // On met en place l'appel à l'API pour récupérer les photos à valider
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/moderators`,
                {
                method : "GET",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                }
            }) 
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des photos :', error);
            });
    }, []);

        // Fonction pour se déconnecter
    const handleClick = () => {
        localStorage.removeItem('SESSION');
        setSession(false);
        setLevel("ROLE_UNKNOWN");
    }

    return (
        <div>
            <h2>Panneau de modérations</h2>
            <button onClick={handleClick}>Déconnexion</button>
            {photos.map((photo) => (
                <ModeratorProvider key={photo.id}>
                    <ValidationPhotoItem key={photo.id} id={photo.id} url={photo.url} />
                </ModeratorProvider>))}
        </div>
    );
};

export default ModeratorProfile;