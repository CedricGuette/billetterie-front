import React, { children, useEffect, useState } from 'react';
import { createContext } from 'react';


export const AuthLevelContext = createContext();
export const AuthLevelProvider = ({ children }) => {

    const [level, setLevel] = useState(["ROLE_UNKNOWN"]);
    const [session, setSession] = useState(false);

    useEffect(() => {

    if(localStorage.getItem('SESSION') !== null) {
        fetch("http://localhost:8080/api/auth/level",
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
    }, [session]);

    return (
        <AuthLevelContext.Provider value={{level, setLevel , session, setSession}}>
            {children}
        </AuthLevelContext.Provider>
            
     )
}

export default AuthLevelProvider;