import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthLevelContext } from '../contexts/AuthLevelProvider';
import { CookiesContext } from "../contexts/CookiesProvider";
import { ErrorPanelContext } from "../contexts/ErrorPanelProvider";

/**
 * Composant Login pour la connexion des utilisateurs.
 * 
 * @returns {JSX.Element} Le formulaire de connexion.
 * @description Ce composant gère la connexion des utilisateurs en collectant les informations nécessaires et en les envoyant à l'API.
 */
const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    // On met en place le contexte pour le niveau d'authentifications    
    const { setSession } = useContext(AuthLevelContext);


    // On prépare le format de la requête pour l'API
    const customer = JSON.stringify(
        {
            username: `${form.username}`,
            password: `${form.password}`,
        }
    );

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur
    const [LoggedInOut, setLoggedInOut] = useState(false);
    const navigate = useNavigate();

    const { cookies } = useContext(CookiesContext);

    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);

    useEffect(() => {
        if (LoggedInOut){
            return navigate("/");
        }
    },[LoggedInOut, navigate]);

    // On met en place la fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(cookies) {
            try {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: customer
                    
                })
                .then((res) =>  res.json())
                .then((data) => {
                    // On stock dans les cookies s'il y a un token en réponse
                    if (data.token) {
                        const object = { value : data.token }
                        localStorage.setItem("SESSION", JSON.stringify(object));
                        setSession(true);
                        setLoggedInOut(true);
                    } else {
                        setSession(false);
                        setLoggedInOut(true);
                        setErrorType(0);
                        setErrorMessage(data.error);
                    }
                });
            } catch (error) {
                setSession(false);
                setLoggedInOut(true);
                setErrorType(0);
                setErrorMessage(error.toString());
            }
        } else {
            setErrorType(0);
            setErrorMessage("Veuillez accepter les cookies pour accéder à cette fonctionnalité.")
        }
    };

    // On met en place la fonction de changement d'état du formulaire
    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
        ...prev,
        [name]: value,
    }));
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <div>
                <label>
                    <div className="labelname">
                        E-mail:
                    </div>
                    <input
                        type="email"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    <div className="labelname">
                        Mot de passe:
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default Login;