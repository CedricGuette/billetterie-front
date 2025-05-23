import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TicketShop from './TicketShop';
import CustomerProfile from './CustomerProfile';
import ModeratorProfile from './ModeratorProfile';
import Administration from './Administration';
import ValidateQr from './ValidateQr';
import { useContext } from 'react';
import { AuthLevelContext } from './AuthLevelProvider';

const Core = () => {
    

    const { level, setLevel } = useContext(AuthLevelContext);

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
                    return <TicketShop />;}
};

export default Core;