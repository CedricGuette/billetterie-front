import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthLevelContext } from './AuthLevelProvider';

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
    const [LoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (LoggedIn){
            return navigate("/");
        }
    },[LoggedIn, navigate]);

    // On met en place la fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: customer
                
            })
            .then((res) =>  res.json())
            .then((data) => {
                if (data.token) {
                    const object = { value : data.token, timestamp : new Date().getTime()}
                    localStorage.setItem("SESSION", JSON.stringify(object));
                    setSession(true);
                    setLoggedIn(true);
                } else {
                    throw new Error("Erreur lors de la connexion, veuillez réessayer.");
                }
            });
            
            if (!response.ok) {
                throw new Error("Erreur lors de l'enregistrement du nouveau client, veuillez réessayer.");
            }
        } catch (error) {
            console.error(error);
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    <div>
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
                    <div>
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