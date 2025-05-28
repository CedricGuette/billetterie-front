import React, { useState } from 'react';
import { createContext } from 'react';


export const AdminPageContext = createContext();

/** Composant Provider pour gérer le changement de page dans l'administration.
 * @param {Object} children - Les composants enfants à envelopper dans le contexte de l'onglet tickets.
 * @returns {JSX.Element} Le contexte de page sur laquelle basculer.
 */
export const AdminPageProvider = ({ children }) => {

    const [ adminPage , setAdminPage ] = useState(false);

    return (
        <AdminPageContext.Provider value={{ adminPage , setAdminPage }}>
            {children}
        </AdminPageContext.Provider> 
     )
}

export default AdminPageProvider;