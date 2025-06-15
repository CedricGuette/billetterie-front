
import { useContext } from 'react';
import { ModeratorContext } from '../../contexts/ModeratorProvider';
import ModerationButton from './ModerationButton';
import PhotoAcces from './PhotoAcces';

/** * Composant pour afficher les pièces d'identités des utilisateurs.
 * @param {string} photo - contient l'ensemble des données relatives aux photos et utilisateurs.
 * @returns renvoie un tableau pour la modération des pièces d'identités.
 */
const VerificationPhotoItem = ({ photo }) => {

    const { deleted } = useContext(ModeratorContext);

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
                    <ModerationButton id={photo.id} user={photo.customer} />
                </td>
            </tr>
        )
    }

    return("")
}
export default VerificationPhotoItem;