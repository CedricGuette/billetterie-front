import React, { useEffect, useState } from "react";
import NotFound from "../../pages/NotFound";
import { useNavigate } from "react-router-dom";

/** Composant CreateAdmin qui permet de créer un nouvel administrateur.
 * @returns {JSX.Element} Le formulaire pour créer un administrateur.
 */
const CreateAdmin = () => {

    const [ adminExist, setAdminExist ] = useState(null);
        // State pour indiquer si le formulaire a été envoyé avec succès
    const [sent, setSent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try{
           fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/doAdminExist`, {
                method: "GET",
                headers : { 
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json())
            .then(data => {
                setAdminExist(data)
            })
        } catch(error) {
            console.log(error);
        }

    },[])

    // Redirection si compte créé
    useEffect(() => {
        if (sent){
            return navigate("/");
        }
    },[sent, navigate]);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    // Préparation des données pour l'envoi au backend
    const admin = JSON.stringify(
        {
            username: `${form.username}`,
            password: `${form.password}`,
        }
    );


    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createAdmin`, {
                method: "POST",
                headers : { 
                    "Content-Type": "application/json",
                },
                body: admin
            })
            .then((res) =>  res.json())
            .then((data) => {
                setSent(data[0]);
            });
            console.log("Administrateur créé avec succès!");
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

    if(adminExist === false) {
        return (

            <form onSubmit={handleSubmit} className="createAdmin">
                <div>
                    <div className="response__panel">{sent}</div>
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
                <button type="submit">Créer Admin</button>
            </form>
        );
    } 
    return (<NotFound />)
};

export default CreateAdmin;