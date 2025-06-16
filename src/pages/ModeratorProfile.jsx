import React, { useEffect, useState, useContext } from 'react';
import ModeratorProvider from '../contexts/ModeratorProvider';
import { AuthLevelContext } from '../contexts/AuthLevelProvider';
import VerificationPhotoItem from '../components/moderator/VerificationPhotoItem';
import Pagination from '../components/Pagination';
import { PageContext } from '../contexts/PageProvider';
import { ErrorPanelContext } from '../contexts/ErrorPanelProvider';

/** Affiche la modération, les photos à valider et permet de se déconnecter. Si l'utilisateur n'est pas connecté, il est redirigé vers la page d'accueil.
 * @returns {JSX.Element} La page de modération.
 */
const ModeratorProfile = () => {
    const [photos, setUser] = useState([]);

    const { setSession, setLevel  } = useContext(AuthLevelContext);
    const { page } = useContext(PageContext);
    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);

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
                setErrorType(0);
                setErrorMessage(error.toString());
            });
    }, [setErrorMessage, setErrorType]);

        // Fonction pour se déconnecter
    const handleClick = () => {
        localStorage.removeItem('SESSION');
        setSession(false);
        setLevel("ROLE_UNKNOWN");
    }

    const elementPerPage = 10;
    const photosInDB = photos.length;

    const photoPageFunction = () => {
        const startInObject = ((page - 1) * elementPerPage);
        const photosPageUseEffect = [];
        for(let i = 0 ; i <= (elementPerPage - 1); i++) {
            if(photos[startInObject + i]) {
                photosPageUseEffect[i] = photos[startInObject + i];
            }
        }
        return photosPageUseEffect;
    }
    
    const photoPage = photoPageFunction();

    return (
        <div className="moderation">
            <h2>Panneau de modérations</h2>
            <button onClick={handleClick}>Déconnexion</button>
            <div className="moderation__panel">
                <Pagination elementPerPage={ elementPerPage } totalElements={ photosInDB } />
                <table>
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th >Informations client</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {photoPage.map((photo) => (
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