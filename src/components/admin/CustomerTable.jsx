import React from 'react';
import CustomerTableLine from './CustomerTableLine';
import ModeratorProvider from '../../contexts/ModeratorProvider';
/** Composant CustomerTable qui permet de créer le contenue du tableau contenant les clients dans l'administration.
 * @param {Object} customers liste des clients à traiter.
 * @returns {JSX.Element} Le contenue du tableau des clients.
 */
const CustomerTable = ({ customers }) => {

    return (
        <div>
            <h2>Liste des clients</h2>
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
                    {customers.map((user) => (
                        <ModeratorProvider>
                            <CustomerTableLine user={ user }/>
                        </ModeratorProvider>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable;