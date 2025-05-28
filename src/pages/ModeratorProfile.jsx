import React, { useEffect, useState, useContext } from 'react';
import ModeratorProvider from '../contexts/ModeratorProvider';
import { AuthLevelContext } from '../contexts/AuthLevelProvider';
import VerificationPhotoItem from '../components/moderator/VerificationPhotoItem';

/** Affiche la modération, les photos à valider et permet de se déconnecter. Si l'utilisateur n'est pas connecté, il est redirigé vers la page d'accueil.
 * @returns {JSX.Element} La page de modération.
 */
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
        <div className="moderation">
            <h2>Panneau de modérations</h2>
            <button onClick={handleClick}>Déconnexion</button>
            <div className="moderation__panel">
                <table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th >Informations client</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {photos.map((photo) => (
                            <ModeratorProvider key={photo.id}>
                                <VerificationPhotoItem photo={photo}/>
                            </ModeratorProvider>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModeratorProfile;