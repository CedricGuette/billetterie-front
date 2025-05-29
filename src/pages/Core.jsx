import React from 'react';
import { useContext } from 'react';
import TicketShop from '../components/TicketShop';
import ModeratorProfile from './ModeratorProfile';
import CustomerProfile from './CustomerProfile';
import Administration from './Administration';
import ValidateQr from './ValidateQr';
import { AuthLevelContext } from '../contexts/AuthLevelProvider';
import { RegisterProvider } from '../contexts/RegisterProvider';
import AdminPageProvider from '../contexts/AdminPageProvider';
import PageProvider from '../contexts/PageProvider';

/** Composant Core qui affiche le contenu principal de l'application en fonction du niveau d'authentification de l'utilisateur.
 * @returns {JSX.Element} Le composant Core.
 */
const Core = () => {
    

    const { level } = useContext(AuthLevelContext);

    switch (level) {
    case "ROLE_USER":
        return <CustomerProfile />;
    case "ROLE_MODERATOR":
        return (
            <PageProvider>
                <ModeratorProfile />
            </PageProvider>
        );
    case "ROLE_SECURITY":
        return <ValidateQr />;
    case "ROLE_ADMIN":
        return(
            <AdminPageProvider>
                <Administration />
            </AdminPageProvider>
        )
    default:
        return (
            <RegisterProvider>
                <TicketShop />
            </RegisterProvider>
        )
    }                    
};

export default Core;