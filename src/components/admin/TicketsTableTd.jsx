import React from "react";

/** Ce composant est l'enfant de TicketsTableLine.
 * @param {object} ticket ticket à afficher.
 * @returns renvoie une ligne du tableau de ticket.
 */
const TicketsTableTd = ({ ticket }) => {

    return (
        <tr index={ticket.id}>
            <td>
                {ticket.id}
            </td>
            <td>
                {ticket.eventCode}
            </td>
            <td>
                {ticket.howManyTickets}
            </td>
            <td>
                {ticket.ticketIsPayed? "Oui" : "Non"}
            </td>
            <td>
                {ticket.ticketCreatedDate}
            </td>
            <td>
                {ticket.ticketIsUsed ? "Oui" : "Non"}
            </td>
            <td>
                {ticket.ticketValidationDate}
            </td>
            <td>
                {ticket.ticketIsUsed ? ticket.security.username : ""}
            </td>
        </tr>
    )
}

export default TicketsTableTd;