import React, { useState } from 'react';
import { createContext } from 'react';


export const CustomerInAdminContext = createContext();

/** Composant Provider pour gérer l'ouverture de l'onglet tickets dans l'administration.
 * @param {Object} children - Les composants enfants à envelopper dans le contexte de l'onglet tickets.
 * @returns {JSX.Element} Le contexte de d'ouverture ou non de l'onglet ticket.
 */
export const CustomerInAdminProvider = ({ children }) => {

    const [openTickets, setOpenTickets] = useState(false);

    return (
        <CustomerInAdminContext.Provider value={{ openTickets, setOpenTickets }}>
            {children}
        </CustomerInAdminContext.Provider> 
     )
}

export default CustomerInAdminProvider;