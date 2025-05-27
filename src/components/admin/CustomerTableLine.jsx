import React, { useState } from 'react';
import DeleteUserButton from './DeleteUserButton';
import TicketsTableLine from './TicketsTableLine';

const CustomerTableLine = ({ user }) => {
    
    const [hidden, setHidden] = useState(true)

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
                {hidden ? "" : <div className="info-tickets"><TicketsTableLine tickets={user.tickets}/></div> }
            </td>
            <td>
                <DeleteUserButton id={user.id} />
            </td>
        </tr>
    )

}

export default CustomerTableLine;