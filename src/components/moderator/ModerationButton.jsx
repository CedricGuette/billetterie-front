import React, { useContext } from "react";
import { ModeratorContext } from "../../contexts/ModeratorProvider";


/** * Composant pour valider la pièce d'identité d'un utilisateur.
 * 
 * @param {string} id - L'identifiant de l'utilisateur dont la pièce d'identité doit être validée 
 * @returns envoie une requête PATCH à l'API pour mettre à jour l'état de la pièce d'identité.
 */
 function MederationButton({id}) {

    // On utilise le contexte ModeratorContext pour accéder à la fonction setDeleted
    const { setDeleted } = useContext(ModeratorContext);

    // On crée un objet vide pour le corps de la requête PATCH
    const customer = JSON.stringify({});

    // Fonction pour envoyer une requête PATCH à l'API pour mettre à jour l'état de la pièce d'identité
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/moderators/` + id ,{
                method: "PATCH",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                },
                body: customer
                
            })
            .then((res) => {
                if (res.ok) {
                    setDeleted(true);
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