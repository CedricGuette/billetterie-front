import React from 'react';
import { useContext } from 'react';
import ModeratorProvider from '../../contexts/ModeratorProvider';
import ModeratorTd from './ModeratorTd';
import Pagination from '../Pagination';
import { PageContext } from '../../contexts/PageProvider';

/** Ce composant est l'en-tête du tableau contenant les modérateurs dans l'administration.
 * @param {object} moderators ensemble des moderateurs à afficher.
 * @returns renvoie un tableau des modérateurs en entrée.
 */
const ModeratorTable = ({ moderators }) => {

        const elementPerPage = 10;
        const moderatorsInDB = moderators.length;
    
        const { page } = useContext(PageContext);
    
        const moderatorPageFunction = () => {
            const startInObject = ((page - 1) * elementPerPage);
            const moderatorsPageUseEffect = [];
            for(let i = 0 ; i <= (elementPerPage - 1); i++) {
                if(moderators[startInObject + i]) {
                    moderatorsPageUseEffect[i] = moderators[startInObject + i];
                }
            }
            return moderatorsPageUseEffect;
        }
        
        const moderatorPage = moderatorPageFunction();

    return (
        <div>
            <h2>Liste des modérateurs</h2>
            <Pagination elementPerPage={ elementPerPage } totalElements={ moderatorsInDB } />
            <table>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Date de création</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {moderatorPage.map((user) => (
                        <ModeratorProvider key={ user.id }>
                            <ModeratorTd moderator={ user } />
                        </ModeratorProvider>
                     ))}
                     </tbody>
            </table>
        </div>
    )
}

export default ModeratorTable;