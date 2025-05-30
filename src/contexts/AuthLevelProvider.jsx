import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { CookiesContext } from './CookiesProvider';


export const AuthLevelContext = createContext();
/** Composant AuthLevelProvider qui fournit le niveau d'authentification de l'utilisateur et gère la session.
 * @param {Object} children - Les composants enfants qui auront accès au contexte d'authentification.
 * @returns {JSX.Element} Le fournisseur de contexte AuthLevelContext.      
 */
export const AuthLevelProvider = ({ children }) => {

    const sessionIsOpen = localStorage.getItem('SESSION') !== null;

    const [level, setLevel] = useState(["ROLE_UNKNOWN"]);
    const [session, setSession] = useState(sessionIsOpen);
    const { cookies } = useContext(CookiesContext);

    // Vérifie si une session existe dans le localStorage et met à jour le niveau d'authentification
    useEffect(() => {
    
        if(localStorage.getItem('SESSION') !== null) {

            if(cookies) {


                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/level`,
                    {
                    method : "GET",
                    headers : { 
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                    }
                }) 
                .then((response) => response.json())
                .then((data) => {
                setLevel(data[0]);

                })
                .catch((error) => console.error('Erreur lors de la requête:', error));
            }
        }
    }, [session, cookies]);

    return (
        <AuthLevelContext.Provider value={{level, setLevel , session, setSession}}>
            {children}
        </AuthLevelContext.Provider>
            
     )
}

export default AuthLevelProvider;