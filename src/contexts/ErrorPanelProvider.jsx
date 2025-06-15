import React, { useState } from 'react';
import { createContext } from 'react';


export const ErrorPanelContext = createContext();

/** Composant Provider pour gérer l'affichage des erreurs dans un panneau.
 * @param {Object} children - Les composants enfants à envelopper dans le contexte.
 * @returns {JSX.Element} Le contexte du message d'erreur à afficher.
 */
export const ErrorPanelProvider = ({ children }) => {

    const [ errorMessage , setErrorMessage ] = useState(null);
    const [ errorType, setErrorType ] = useState(0);

    return (
        <ErrorPanelContext.Provider value={{ errorMessage , setErrorMessage, errorType, setErrorType }}>
            {children}
        </ErrorPanelContext.Provider> 
     )
}

export default ErrorPanelProvider;