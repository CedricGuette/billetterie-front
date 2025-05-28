
import { useContext } from 'react';
import { ModeratorContext } from '../../contexts/ModeratorProvider';
import ModerationButton from './ModerationButton';
import PhotoView from './PhotoView';

/** * Composant pour afficher les pièces d'identités des utilisateurs.
 * @param {string} photo - contient l'ensemble des données relatives aux photos et utilisateurs.
 * @returns renvoie un tableau pour la modération des pièces d'identités.
 */
const VerificationPhotoItem = ({ photo }) => {

    const { deleted, showPhoto, setShowPhoto } = useContext(ModeratorContext);

    const handleClick = () => {
        setShowPhoto(true);
    }

    if(!deleted) {
        return(
            <tr key={photo.id}>
                <td className="verificationPhoto" rowSpan={4}>
                    <img
                        src = {process.env.REACT_APP_BACKEND_URL + photo.url} 
                        alt={`${photo.id}`}
                        onClick={handleClick}
                    />
                    {showPhoto ? <PhotoView photo={ photo } /> : ""}
                </td>
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