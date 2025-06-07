import React, { useContext } from "react";
import { ModeratorContext } from "../../contexts/ModeratorProvider";

/** Ce composant permet de supprimer un utilisateur en envoyant une requête DELETE à l'API.
 * @param {string} id L'identifiant de l'utilisateur à supprimer.
 * @returns envoie une requête DELETE à l'API pour supprimer l'utilisateur.
 */
 function DeleteUserButton({id}) {

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur
    const { setDeleted } = useContext(ModeratorContext);


    // Fonction pour envoyer une requête DELETE à l'API pour supprimer l'utilisateur
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users/` + id ,{
                method: "DELETE",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value
                }
            })
            .then((res) => {
                if (res.ok) {
                    setDeleted(true);
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