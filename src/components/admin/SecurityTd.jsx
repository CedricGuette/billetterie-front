import React, { useContext } from 'react';
import DeleteUserButton from './DeleteUserButton';
import { ModeratorContext } from '../../contexts/ModeratorProvider';
import transformToDate from '../TransformToDate';

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
                    {security.createdDate ? transformToDate(security.createdDate) : ""} 
                </td>
                <td>
                    <DeleteUserButton id={ security.id } username={ security.username }/>
                </td>
            </tr>
        )
    }

    return("")
}

export default SecurityTable;