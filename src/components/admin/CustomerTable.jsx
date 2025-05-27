import React from 'react';
import { Link } from 'react-router-dom';
import CustomerTableLine from './CustomerTableLine';

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
                    {customers.map((user) => (<CustomerTableLine user={ user }/>))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable;