import React from "react";
import transformToDate from "../TransformToDate";

/** Ce composant est l'enfant de TicketsTableLine.
 * @param {object} ticket ticket à afficher.
 * @returns renvoie une ligne du tableau de ticket.
 */
const TicketsTableTd = ({ ticket }) => {

    return (
        <tr>
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
                {ticket.ticketCreatedDate ? transformToDate(ticket.ticketCreatedDate) : ""}
            </td>
            <td>
                {ticket.ticketIsUsed ? "Non" : "Oui"}
            </td>
            <td>
                {ticket.ticketValidationDate ? transformToDate(ticket.ticketValidationDate) : ""}
            </td>
            <td>
                {ticket.ticketIsUsed ? ticket.security.username : ""}
            </td>
        </tr>
    )
}

export default TicketsTableTd;