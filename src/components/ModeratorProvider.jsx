import React, { useState } from 'react';
import { createContext } from 'react';


export const ModeratorContext = createContext();

/**
 * Composant Provider pour gérer l'état de la modération.
 * @param {Object} children - Les composants enfants à envelopper dans le contexte de modération.
 * @returns {JSX.Element} Le contexte de modération avec l'état et la fonction de mise à jour.
 * @description Ce composant fournit un contexte pour gérer l'état de la modération, notamment si un élément a été supprimé.
 */
export const ModeratorProvider = ({ children }) => {

    const [deleted, setDeleted] = useState(false);

    return (
        <ModeratorContext.Provider value={{ deleted, setDeleted }}>
            {children}
        </ModeratorContext.Provider> 
     )
}

export default ModeratorProvider;