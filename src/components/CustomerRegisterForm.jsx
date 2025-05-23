import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLevelContext } from "./AuthLevelProvider";
import { useContext } from 'react';


const CustomerRegisterForm = () => {

    // On met en place les éléments pour la redirection
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sent){
            return navigate("/login");
        }
    },[sent]);


    // On importe le composant React et useState pour gérer l'état du formulaire
    const [form, setForm] = useState({
        firstName: "",
        LastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        photo: null,
    });

    // On récupère le choix de l'utilisateur depuis le localStorage et on prépare le format de la requête pour l'API
    const choice = localStorage.getItem("TICKET_CHOICE");
    const customer = JSON.stringify(
        {
            firstName: `${form.firstName}`,
            lastName: `${form.lastName}`,
            phoneNumber: `${form.phoneNumber}`,
            username: `${form.email}`,
            password: `${form.password}`,
            tickets: [
                {
                eventCode: "1",
                howManyTickets: choice
                }
            ]
        }
    );
    // On crée un objet Blob pour le fichier photo
    const blob = new Blob([customer], { type: "application/json" });
    const formData = new FormData();
    formData.append("customer", blob);
    formData.append("photo", form.photo);

    // On met en place la fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                 
                },
                body: formData
                
            })
            .then((res) => {
                if (res.ok) {
                    localStorage.removeItem("TICKET_CHOICE");
                    setSent(true);
            }
            if (!response.ok) {
                throw new Error("Erreur lors de l'enregistrement du nouveau client, veuillez réessayer.");
            }
            });
            } catch (error) {
            console.error(error);
        }
    };

    // On met en place la fonction de changement d'état du formulaire
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Prénom:
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    E-mail:
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Numéro de téléphone:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Mot de passe:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Confirmez mot de passe:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Photo de votre carte d'identité:
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button type="submit">Réservez vos tickets</button>
        </form>
    );
};

export default CustomerRegisterForm;