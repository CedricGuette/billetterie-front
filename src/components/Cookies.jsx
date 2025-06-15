import React, { useContext, useState } from "react";
import { CookiesContext } from "../contexts/CookiesProvider";

/**Ce composant sert à acceper ou non la politique des cookies du site.
 * @returns {JSX.Element} Un panneau qui demande d'accepter la politique des cookies du site et alimente le context.
 */
const Cookies = () => {

    const cookiesIsSet = () => { return cookies ? cookies : false }

    // On met en place le contexte pour afficher ou non la fenêtre et modifier son état.
    const { cookies, setCookies } = useContext(CookiesContext);

    // On crée un useState pour fermer la fenêtre sans accepter la politique des cookies.
    const [ closed, setClosed ] = useState(cookiesIsSet);

    // Fonction pour accepter 
    const handleClickAccept = () => {
        setCookies(true);
        localStorage.setItem('COOKIES', true);
        setClosed(true);
    }

    // Fonction pour refuser
    const handleClickRefuse = () => {
        setClosed(true);
    }

    // Fonction pour ouvrir le panneau des cookies
    const handleOpenCookiesOption = () => {
        setClosed(false);
    }

    if(!closed) {
        return(
            <div className="cookies">
                <div className="cookies__panel">
                    <div>
                        <h2>Avant d'accéder au site</h2>
                        <p>
                            Nous utilisons des cookies pour :
                            <ul>
                                <li>Gérer le système de connexion au site.</li>
                                <li>Mémoriser votre choix quant à l'utilisation des cookies.</li>
                            </ul>

                            En acceptant, nous utiliseront donc des cookies à ces fins.

                            Si vous refusez, le site risque de devenir non fonctionnel, vous pourrez tout de même consulter les informations disponible sur la page d'accueil.
                        </p>
                    </div>
                    <div>
                        <button onClick={handleClickAccept}>Tout accepter</button>
                        <button onClick={handleClickRefuse}>Tout refuser</button>
                    </div>
                </div>
            </div>
        )
    }

    if(closed && (localStorage.getItem('COOKIES') === null)) {

        return (<div onClick={handleOpenCookiesOption} className="cookie-button-open">Option des cookies</div>)
    }

    return("")
}

export default Cookies;