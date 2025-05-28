import React from "react";
import TicketsTableTd from "./TicketsTableTd";

/** Ce composant est l'en-tête du tableau contenant les tickets des clients dans l'administration
 * @param {object} tickets ensemble des tickets à afficher.
 * @returns renvoie un tableau des tickets en entrée.
 */
const TicketsTableLine = ({ tickets }) => {

    return (
        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Code event</td>
                    <td>Combien?</td>
                    <td>Payé?</td>
                    <td>Créé le</td>
                    <td>Valable?</td>
                    <td>Validé le?</td>
                    <td>Par</td>
                </tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => (<TicketsTableTd ticket={ ticket }/>))}
            </tbody>
        </table>
    )
}

export default TicketsTableLine;