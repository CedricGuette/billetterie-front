import React, { useContext } from 'react';
import DeleteUserButton from './DeleteUserButton';
import { ModeratorContext } from '../../contexts/ModeratorProvider';
import transformToDate from '../TransformToDate';

/** Ce composant est l'enfant de ModeratorTable.
 * @param {object} moderator moderator à afficher.
 * @returns renvoie une ligne de tableau du modérateur en entrée.
 */
const ModeratorTd = ({ moderator }) => {

    const { deleted } = useContext(ModeratorContext);

    if(!deleted) {
        return (
            <tr key={moderator.id}>
                <td>
                    {moderator.username}
                </td>
                <td>
                    {moderator.createdDate ? transformToDate(moderator.createdDate) : ""}
                </td>
                <td>
                    <DeleteUserButton id={moderator.id} username={moderator.username} />
                </td>
            </tr>
        )
    }

    return("")

}

export default ModeratorTd;