import React from 'react';
import TicketShop from './TicketShop';
import CustomerProfile from './CustomerProfile';
import ModeratorProfile from './ModeratorProfile';
import Administration from './Administration';
import ValidateQr from './ValidateQr';
import { useContext } from 'react';
import { AuthLevelContext } from './AuthLevelProvider';
import RegisterProvider from './RegisterProvider';

/** Composant Core qui affiche le contenu principal de l'application en fonction du niveau d'authentification de l'utilisateur.
 * 
 * @returns {JSX.Element} Le composant Core.
 */
const Core = () => {
    

    const { level } = useContext(AuthLevelContext);

                switch (level) {
                case "ROLE_USER":
                    return <CustomerProfile />;
                case "ROLE_MODERATOR":
                    return <ModeratorProfile />;
                case "ROLE_SECURITY":
                    return <ValidateQr />;
                case "ROLE_ADMIN":
                    return <Administration />;
                default:
                    return (
                        <RegisterProvider>
                            <TicketShop />
                        </RegisterProvider>)
                        }
                        
};

export default Core;