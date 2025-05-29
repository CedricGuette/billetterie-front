import React, { useState } from 'react';
import { createContext } from 'react';


export const PageContext = createContext();

/** Ce composant fournit un contexte pour gérer la pagination.
 * @param {Object} children - Les composants enfants à envelopper dans le contexte de modération.
 * @returns {JSX.Element} Le contexte de pagination.
 */
export const PageProvider = ({ children }) => {

    const [page, setPage] = useState(1);

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider> 
     )
}

export default PageProvider;