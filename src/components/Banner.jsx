import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthLevelContext } from './AuthLevelProvider';
import Login from './Login';

/**
 * Composant Banner qui affiche le titre de l'application et un lien de déconnexion ou de connexion.
 * 
 * @returns {JSX.Element} Le composant Banner.
 */
function Banner() {

    const { setLevel } = useContext(AuthLevelContext);
    const { session, setSession } = useContext(AuthLevelContext);

    // Fonction pour gérer le clic sur le lien de déconnexion
    const handleClick = () => {
    localStorage.removeItem('SESSION');
    setLevel("ROLE_UNKNOWN");
    setSession(false);
    }

    return (
        <header className="App-header">
            <div className="title">
                <h1>Billetterie pour les Jeux Olympiques de 2024 de Paris</h1>
            </div>
            <nav>
                {session ? <Link className="logout-button" to="/" onClick={handleClick}>Se déconnecter</Link> : <Login />}
            </nav>
        </header>
    );
}

export default Banner;