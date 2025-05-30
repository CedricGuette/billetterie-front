import React, { useState } from 'react';
import { createContext } from 'react';


export const CookiesContext = createContext();

/** Composant Provider pour gérer l'autorisation d'utiliser des cookies par les utilisateurs.
 * @param {Object} children - Les composants enfants à envelopper dans le contexte de l'onglet tickets.
 * @returns {JSX.Element} Le contexte des cookies.
 */
export const CookiesProvider = ({ children }) => {

    const cookiesIsSet = () => { return localStorage.getItem("COOKIES") ? localStorage.getItem("COOKIES") : false };

    const [ cookies , setCookies ] = useState(cookiesIsSet());

    return (
        <CookiesContext.Provider value={{ cookies , setCookies }}>
            {children}
        </CookiesContext.Provider> 
     )
}

export default CookiesProvider;