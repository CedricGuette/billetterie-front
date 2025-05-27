import React from "react";
import TicketsTableTd from "./TicketsTableTd";

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