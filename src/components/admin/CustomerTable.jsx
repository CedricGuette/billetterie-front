import React, { useContext } from 'react';
import CustomerTableLine from './CustomerTableLine';
import ModeratorProvider from '../../contexts/ModeratorProvider';
import Pagination from '../Pagination';
import { PageContext } from '../../contexts/PageProvider';

/** Composant CustomerTable qui permet de créer le contenue du tableau contenant les clients dans l'administration.
 * @param {Object} customers liste des clients à traiter.
 * @returns {JSX.Element} Le contenue du tableau des clients.
 */
const CustomerTable = ({ customers }) => {

    const elementPerPage = 10;
    const customersInDB = customers.length;

    const { page } = useContext(PageContext);

    const customerPageFunction = () => {
        const startInObject = ((page - 1) * elementPerPage);
        const customersPageUseEffect = [];
        for(let i = 0 ; i <= (elementPerPage - 1); i++) {
            if(customers[startInObject + i]) {
                customersPageUseEffect[i] = customers[startInObject + i];
            }
        }
        return customersPageUseEffect;
    }
    
    const customerPage = customerPageFunction();

    return (
        <div>
            <h2>Liste des clients</h2>
            <Pagination elementPerPage={ elementPerPage } totalElements={ customersInDB } />
            <table>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Numéro de téléphone</th>
                        <th>Date de création</th>
                        <th>Tickets</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customerPage.map((user) => (
                        <ModeratorProvider key={ user.id }>
                            <CustomerTableLine user={ user }/>
                        </ModeratorProvider>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable;