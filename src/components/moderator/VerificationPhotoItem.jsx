
import { useContext } from 'react';
import { ModeratorContext } from '../../contexts/ModeratorProvider';
import ModerationButton from './ModerationButton';
import PhotoView from './PhotoView';
import PhotoAcces from './PhotoAcces';

/** * Composant pour afficher les pièces d'identités des utilisateurs.
 * @param {string} photo - contient l'ensemble des données relatives aux photos et utilisateurs.
 * @returns renvoie un tableau pour la modération des pièces d'identités.
 */
const VerificationPhotoItem = ({ photo }) => {

    const { deleted, showPhoto, setShowPhoto } = useContext(ModeratorContext);

    const handleClick = () => {
        setShowPhoto(true);
    }

    const photoRequest = (photoUrl) => {

        fetch(`${process.env.REACT_APP_BACKEND_URL + photoUrl}`,
        {
        method : "GET",
        headers : { 
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
            }
        })
        .then((response) => response.blob())
        .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            return blob
        })
        .catch((error) => console.error('Erreur lors de la requête:', error))

    }

    if(!deleted) {
        return(
            <tr key={photo.id}>
                    <PhotoAcces photoUrl={photo.url} customer={photo.customer} />
                <td>
                    <div className="customer-info">
                        <strong>Prénom :</strong> {photo.customer.firstName}
                    </div>
                    <div className="customer-info">
                        <strong>Nom :</strong> {photo.customer.lastName}
                    </div>
                    <div className="customer-info">
                        <strong>Ajoutée le :</strong> {photo.customer.createdDate}
                    </div>
                    <div className="customer-info">
                        <strong>E-mail :</strong> {photo.customer.username}
                    </div>
                </td>
                <td >
                    <ModerationButton id={photo.id} />
                </td>
            </tr>
        )
    }

    return("")
}
export default VerificationPhotoItem;