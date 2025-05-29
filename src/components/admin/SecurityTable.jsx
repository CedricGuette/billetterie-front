import React from 'react';
import { useContext } from 'react';
import ModeratorProvider from '../../contexts/ModeratorProvider';
import SecurityTd from './SecurityTd';
import Pagination from '../Pagination';
import { PageContext } from '../../contexts/PageProvider';

/** Ce composant est l'en-tête du tableau contenant les agents de sécurité dans l'administration.
 * @param {object} securities ensemble des agents de sécurité à afficher.
 * @returns renvoie un tableau des agents de sécurité en entrée.
 */
const SecurityTable = ({ securities }) => {

    const elementPerPage = 10;
    const securitiesInDB = securities.length;

    const { page } = useContext(PageContext);

    const securityPageFunction = () => {
        const startInObject = ((page - 1) * elementPerPage);
        const securitiesPageUseEffect = [];
        for(let i = 0 ; i <= (elementPerPage - 1); i++) {
            if(securities[startInObject + i]) {
                securitiesPageUseEffect[i] = securities[startInObject + i];
            }
        }
        return securitiesPageUseEffect;
    }
    
    const securityPage = securityPageFunction();

    return (
        <div>
            <h2>Liste des agents de sécurité</h2>
            <Pagination elementPerPage={ elementPerPage } totalElements={ securitiesInDB } />
            <table>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Date de création</th>
                        <th>Action</th>
                    </tr>
                </thead>
                 <tbody>
                    {securityPage.map((user) => (
                        <ModeratorProvider key={ user.id }>
                            <SecurityTd security={ user } />
                        </ModeratorProvider>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default SecurityTable;