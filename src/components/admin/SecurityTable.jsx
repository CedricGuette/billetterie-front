import React from 'react';
import ModeratorProvider from '../../contexts/ModeratorProvider';
import SecurityTd from './SecurityTd';

/** Ce composant est l'en-tête du tableau contenant les agents de sécurité dans l'administration.
 * @param {object} securities ensemble des agents de sécurité à afficher.
 * @returns renvoie un tableau des agents de sécurité en entrée.
 */
const SecurityTable = ({ securities }) => {

    return (
        <div>
            <h2>Liste des agents de sécurité</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Date de création</th>
                        <th>Action</th>
                    </tr>
                </thead>
                 <tbody>
                    {securities.map((user) => (
                        <ModeratorProvider>
                            <SecurityTd security={ user } />
                        </ModeratorProvider>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default SecurityTable;