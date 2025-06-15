import React, { useContext, useState } from "react";
import { ModeratorContext } from "../../contexts/ModeratorProvider";
import { ErrorPanelContext } from "../../contexts/ErrorPanelProvider";

/** Ce composant permet de supprimer un utilisateur en envoyant une requête DELETE à l'API.
 * @param {string} id L'identifiant de l'utilisateur à supprimer.
 * @returns envoie une requête DELETE à l'API pour supprimer l'utilisateur.
 */
 function DeleteUserButton({id, username}) {

    // On initialise le state pour savoir si l'utilisateur est connecté et le rediriger vers la page utilisateur
    const { setDeleted } = useContext(ModeratorContext);

    // On crée le contexte et le State pour gérer les boites de dialogue
    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);
    const [ confirmation, setConfirmation ] = useState(false);


    // Fonction pour envoyer une requête DELETE à l'API pour supprimer l'utilisateur
    const handleConfirm = async (e) => {
        e.preventDefault();

        let requestIsOk = false;

        // On ferme la précédente boite de dialogue
        setConfirmation(false);

        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users/` + id ,{
            method: "DELETE",
            headers : { "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value }
            })
            .then((res) => {
                if (res.ok === true) {
                    requestIsOk = true;
                }
                return res.json();
            })
            .then((data) => {

                if (requestIsOk === true) {
                    setErrorType(2);
                    setErrorMessage(data.deleted);
                    setDeleted(true);
                } else {
                    setErrorType(0);
                    setErrorMessage(data.error);
                }
            })
        } catch (error) {
            setErrorType(0);
            setErrorMessage(error);
        }
    };

    const handleOpenConfirmation = () => {
        setConfirmation(true);
    }

    const handleDenyDelete = () => {
        setConfirmation(false);
    }

    return (
        <div>
            <button onClick={handleOpenConfirmation}>Supprimer l'utilisateur</button>
            {confirmation ? <div className="error">
                <div className="error__panel">
                    <h3>Êtes-vous sûr de vouloir supprimer le compte de : { username }?</h3>
                    <div className="button-choice">
                        <button onClick={handleConfirm}>Confirmer</button>
                        <button onClick={handleDenyDelete}>Refuser</button>
                    </div>
                </div>
            </div> : ""}
        </div>
    );
};

export default DeleteUserButton;