import React, { useEffect, useState } from 'react';
import ValidationPhotoItem from '../components/moderator/VerificationPhotoItem';
import ModeratorProvider from '../contexts/ModeratorProvider';

const ModeratorProfile = () => {
    const [photos, setUser] = useState([]);

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

    return (
        <div>
            <h2>Panneau de modérations</h2>
            {photos.map((photo) => (
                <ModeratorProvider key={photo.id}>
                    <ValidationPhotoItem key={photo.id} id={photo.id} url={photo.url} />
                </ModeratorProvider>))}
        </div>
    );
};

export default ModeratorProfile;