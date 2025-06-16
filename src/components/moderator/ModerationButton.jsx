import React, { useContext, useState } from "react";
import { ModeratorContext } from "../../contexts/ModeratorProvider";
import { ErrorPanelContext } from "../../contexts/ErrorPanelProvider";


/** Composant pour valider la pièce d'identité d'un utilisateur.
 * @param {string} id - L'identifiant de l'utilisateur dont la pièce d'identité doit être validée 
 * @returns envoie une requête PATCH à l'API pour mettre à jour l'état de la pièce d'identité.
 */
 function MederationButton({id, user}) {

    // On utilise le contexte ModeratorContext pour accéder à la fonction setDeleted
    const { setDeleted } = useContext(ModeratorContext);

    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);

    const [ confirmation, setConfirmation ] = useState(false);

    // Fonction pour envoyer une requête PATCH à l'API pour mettre à jour l'état de la pièce d'identité
    const handleConfirm = async (e) => {
        e.preventDefault();

        let requestIsOk = false;

        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/moderators/` + id ,{
                method: "PATCH",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                },
                body: {}
            })
            .then((res) => {
                if (res.ok === true) {
                    requestIsOk = true;
                }
                return res.json();
            })
            .then((data) => {
                if(requestIsOk === true) {
                    setErrorType(2);
                    setErrorMessage(data.validated);
                    setDeleted(true);
                } else {
                    setErrorType(0);
                    setErrorMessage(data.error);
                }
            });
        } catch (error) {
            setErrorType(0);
            setErrorMessage(error.toString());
        }
    };

    const handleOpenConfirmation = () => {
        setConfirmation(true);
    }

    const handleDeny = () => {
        setConfirmation(false);
    }

    return (
        <div>
            <button onClick={handleOpenConfirmation}>Valider la pièce d'identité</button>
            {confirmation ? <div className="error">
                <div className="error__panel">
                    <h3>Êtes-vous sûr de vouloir valider la photo de : { user.firstName + " " + user.lastName }?</h3>
                    <div className="button-choice">
                        <button onClick={handleConfirm}>Confirmer</button>
                        <button onClick={handleDeny}>Refuser</button>
                    </div>
                </div>
            </div> : ""}
        </div>
    );
};

export default MederationButton;