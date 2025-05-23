import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

 function DeleteUserButton({id}) {

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
            const response = await fetch("http://localhost:8080/api/admin/users" + id ,{
                method: "DELETE",
                headers : { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                },
                body: customer
                
            })
            .then((res) => {
                if (res.ok) {
                    setdeletedElement(true);
                }
                
            })
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression de l'utilisateur, veuillez réessayer.");
            
            };
            } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Supprimer l'utilisateur</button>
        </form>
    );
};

export default DeleteUserButton;