import React, { useState } from 'react';
import { createContext } from 'react';


export const RegisterContext = createContext();

/**
 * Composant RegisterProvider pour gérer l'état d'envoi du formulaire d'inscription.
 * 
 * @param {Object} children - Les composants enfants à envelopper dans le contexte.
 * @returns {JSX.Element} Le fournisseur de contexte pour l'inscription.
 * @description Ce composant permet de partager l'état d'envoi du formulaire d'inscription entre les composants enfants.
 */
export const RegisterProvider = ({ children }) => {

    const [sent, setSent] = useState(false);

    return (
        <RegisterContext.Provider value={{ sent, setSent }}>
            {children}
        </RegisterContext.Provider> 
     )
}

export default RegisterProvider;