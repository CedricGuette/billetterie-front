import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Composant pour supprimer un utilisateur.
 * @param {string} id - L'identifiant de l'utilisateur à supprimer.
 * @returns envoie une requête DELETE à l'API pour supprimer l'utilisateur.
 * @description Ce composant permet de supprimer un utilisateur en envoyant une requête DELETE à l'API.
 */
 function DeleteUserButton({id}) {

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur
    const [deletedElement, setdeletedElement] = useState(false);
    const navigate = useNavigate();

    // Si l'utilisateur a été supprimé, on le redirige vers la page d'accueil
    useEffect(() => {
        if (deletedElement){
            return navigate("/");
        }
    },[deletedElement, navigate]);

    // On crée un objet vide pour le corps de la requête
    const customer = JSON.stringify({});

    // Fonction pour envoyer une requête DELETE à l'API pour supprimer l'utilisateur
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users` + id ,{
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