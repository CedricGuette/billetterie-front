import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

 function MederationButton({id}) {

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur
    const [deletedElement, setdeletedElement] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (deletedElement){
            return navigate("/");
        }
    },[deletedElement]);

    const customer = JSON.stringify(
    {
    
    }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/moderators/" + id ,{
                method: "PATCH",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                },
                body: customer
                
            })
            .then((res) => {
                if (res.ok) {
                    deletedElement(true);
                }
            })
            if (!response.ok) {
                throw new Error("Erreur lors de l'enregistrement du nouveau client, veuillez réessayer.");
            
            };
            } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Valider la pièce d'identité</button>
        </form>
    );
};

export default MederationButton;