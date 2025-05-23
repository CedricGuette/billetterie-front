import React, { useState } from "react";

const CreateSecurity = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });


    const moderator = JSON.stringify(
        {
            username: `${form.username}`,
            password: `${form.password}`,
        }
    );
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/admin/createSecurity", {
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