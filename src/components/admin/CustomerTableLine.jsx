import React, { useContext, useState } from 'react';
import DeleteUserButton from './DeleteUserButton';
import TicketsTableLine from './TicketsTableLine';
import { ModeratorContext } from '../../contexts/ModeratorProvider';

/** Composant enfant de CustomerTable qui va être bouclé pour chaque client.
 * @param {object} user objet content le client
 * @returns {JSX.Element} Le formulaire pour créer un administrateur.
 */
const CustomerTableLine = ({ user }) => {
    
    const [hidden, setHidden] = useState(true)
    const { deleted } = useContext(ModeratorContext);

    if(!deleted) {
        return (
            <tr key={user.id}>
                <td>
                    {user.username}
                </td>
                <td>
                    {user.firstName}
                </td>
                <td>
                    {user.lastName} 
                </td>
                <td>
                    {user.phoneNumber} 
                </td>
                <td>
                    {user.createdDate} 
                </td>
                <td className="tickets-cell" onMouseEnter={ () => setHidden(false) } onMouseLeave={ () => setHidden(true) }>
                    <strong>Afficher le(s) ticket(s)</strong>
                    {hidden ? "" : <div className="info-tickets"><TicketsTableLine tickets={user.tickets} /></div> }
                </td>
                <td>
                    <DeleteUserButton id={user.id} username={ user.username } />
                </td>
            </tr>
        )
    }

    return("")

}

export default CustomerTableLine;