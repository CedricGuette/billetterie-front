import React from 'react';
import ModeratorProvider from '../../contexts/ModeratorProvider';
import ModeratorTd from './ModeratorTd';

/** Ce composant est l'en-tête du tableau contenant les modérateurs dans l'administration.
 * @param {object} moderators ensemble des moderateurs à afficher.
 * @returns renvoie un tableau des modérateurs en entrée.
 */
const ModeratorTable = ({ moderators }) => {

    return (
        <div>
            <h2>Liste des modérateurs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Date de création</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {moderators.map((user) => (
                        <ModeratorProvider>
                            <ModeratorTd moderator={ user } />
                        </ModeratorProvider>
                     ))}
                     </tbody>
            </table>
        </div>
    )
}

export default ModeratorTable;