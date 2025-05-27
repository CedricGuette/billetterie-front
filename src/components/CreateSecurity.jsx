import React, { useState } from "react";

/** Composant CreateSécurity qui permet de créer un nouvel agent de sécurité.
 * 
 * @returns {JSX.Element} Le formulaire pour créer un agent de sécurité.
 */
const CreateSecurity = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    // Préparation des données pour l'envoi au backend
    const moderator = JSON.stringify(
        {
            username: `${form.username}`,
            password: `${form.password}`,
        }
    );
    
    // State pour indiquer si le formulaire a été envoyé avec succès
    const [sent, setSent] = useState(false);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/createSecurity`, {
                method: "POST",
                headers : { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                },
                body: moderator
            })
            .then((res) =>  res.json())
            .then((data) => {
                setSent(data[0]);
            });
            if (!response.ok) {
            throw new Error("Erreur lors de l'enregistrement du nouveau client, veuillez réessayer.");
            }
            console.log("Demande de réservation envoyée avec succès");
        } catch (error) {
            console.error(error);
        }
    };

    // Fonction pour gérer les changements dans les champs du formulaire
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
                <div >{sent}</div>
                <label>
                    E-mail:
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
            <button type="submit">Créer un agent de Sécurité</button>
        </form>
    );
};

export default CreateSecurity;