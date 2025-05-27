import React from 'react';
import DeleteUserButton from './DeleteUserButton';

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
                        <tr key={user.id}>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.createdDate} 
                            </td>
                            <td>
                                <DeleteUserButton id={user.id} />
                            </td>
                        </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default SecurityTable;