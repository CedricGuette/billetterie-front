import React, { useContext } from 'react';
import DeleteUserButton from './DeleteUserButton';
import { ModeratorContext } from '../../contexts/ModeratorProvider';

/** Ce composant est l'enfant de SecurityTable.
 * @param {object} security agent de securité à afficher.
 * @returns renvoie une ligne de tableau de l'agent de securité en entrée.
 */
const SecurityTable = ({ security }) => {

    const { deleted } = useContext(ModeratorContext);

    if(!deleted) {
        return (
            <tr key={security.id}>
                <td>
                    {security.username}
                </td>
                <td>
                    {security.createdDate} 
                </td>
                <td>
                    <DeleteUserButton id={security.id} />
                </td>
            </tr>
        )
    }

    return("")
}

export default SecurityTable;