import { useContext } from "react";
import { ErrorPanelContext } from "../contexts/ErrorPanelProvider";

/**
 * Composant qui gère l'affichage des boites de dialogues sur le site 
 * 
 * @returns {JSX.Element} Le composant des boites de dialogue.
 */
const ErrorPanel = () => {

    const { errorMessage, setErrorMessage, errorType } = useContext(ErrorPanelContext);

    // Fonction pour fermer la fenêtre d'erreur
    const handleClick = () => {
        setErrorMessage(null);
    }
    
    if(!(errorMessage === null) && errorType === 0){

        return (
            <div className="error">
                <div className="error__panel">
                    <h3>Erreur :</h3>
                    {errorMessage}
                    <button onClick={handleClick}>Compris</button>
                </div>
            </div>
        )
    } else if ((!(errorMessage === null)) && errorType === 1) {

        return (
                <div className="error">
                    <ul>
                        <strong>Veuillez remplir les critères suivant correctement pour soumettre votre réservation :</strong>
                    {errorMessage.map((error) => 
                        <li key={error}>{error}</li>
                    )}
                    <button onClick={handleClick}>Compris</button>
                    </ul>
                </div>
        )
    } else if ((!(errorMessage === null)) && errorType === 2) {
        
        return (
            <div className="error">
                <div className="error__panel">
                    <h3>Information :</h3>
                    {errorMessage}
                    <button onClick={handleClick}>Compris</button>
                </div>
            </div>
        )
    }
};



export default ErrorPanel;