import React, { useState, useContext } from "react";
import { RegisterContext } from "../contexts/RegisterProvider";

/**
 * Composant pour enregistrer un nouveau client.  
 * @param {Object} props - Les propriétés du composant, notamment le choix de l'utilisateur pour le nombre de tickets.
 * @returns {JSX.Element} Le formulaire d'enregistrement du client.
 * @description Ce composant gère l'enregistrement d'un nouveau client en collectant les informations nécessaires et en les envoyant à l'API.
 */
const CustomerRegisterForm = (props) => {

    // On met en place les éléments pour après la validation du formulaire
    const { setSent } = useContext(RegisterContext);

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

    // On récupère le choix de l'utilisateur et on prépare le format de la requête pour l'API
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
                howManyTickets: props.choice
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
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                 
                },
                body: formData
                
            })
            .then((res) => {
                if (res.ok) {
                    setSent(true);
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
        <form onSubmit={handleSubmit} className="customer-register-form">
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
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleChange}
                        className="file-input"
                        required
                    />
                <div className="file-input-info">Formats acceptés: JPEG, PNG, JPG </div>
                <div className="file-input-info">Taille maximale: 2 Mo</div>
                </label>
            </div>
            <button type="submit">Réservez vos tickets</button>
        </form>
    );
};

export default CustomerRegisterForm;