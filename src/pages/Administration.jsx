import React from 'react';
import { useContext } from 'react';
import { AdminPageContext } from '../contexts/AdminPageProvider';
import CreateUser from '../components/admin/CreateUser';
import UsersList from '../components/admin/UsersList';

/** * Composant qui gère la page d'administration.
 * @returns renvoie le rendu de la page d'administration en fonction des states et contexts.
 */
const Administration = () => {

    const { adminPage } = useContext(AdminPageContext);

    return (<div>
        { adminPage ? <UsersList /> : <CreateUser /> }
        </div>
    );
};

export default Administration;