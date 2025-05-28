import React from 'react';
import { useContext } from 'react';
import { AdminPageContext } from '../contexts/AdminPageProvider';
import CreateUser from '../components/admin/CreateUser';
import UsersList from '../components/admin/UsersList';

const Administration = () => {

    const { adminPage } = useContext(AdminPageContext);

    return (<div>
        { adminPage ? <UsersList /> : <CreateUser /> }
        </div>
    );
};

export default Administration;