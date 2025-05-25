import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthLevelContext } from './AuthLevelProvider';
import Login from './Login';

function Banner() {

    const { level, setLevel } = useContext(AuthLevelContext);
    const { session, setSession } = useContext(AuthLevelContext);

    const handleClick = () => {
    localStorage.removeItem('SESSION');
    setLevel("ROLE_UNKNOWN");
    setSession(false);
    }

    return (
        <header className="App-header">
            <span>Billetterie pour les Jeux Olympiques de 2024 de Paris</span>
            <nav>
                {session ? <Link to="/" onClick={handleClick}>Logout</Link> : <Login />}
            </nav>
        </header>
    );
}

export default Banner;