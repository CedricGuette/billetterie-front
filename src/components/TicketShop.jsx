import React, { useContext, useEffect, useState } from "react";
import CustomerRegisterForm from "./CustomerRegisterForm";
import { RegisterContext } from "../contexts/RegisterProvider";

/**
 * Composant TicketShop pour gérer la sélection et l'enregistrement des tickets.
 * 
 * @returns {JSX.Element} Le composant de la boutique de tickets.
 * @description Ce composant permet à l'utilisateur de choisir une offre de ticket et de remplir un formulaire d'enregistrement.
 */
const TicketShop = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [choice, setChoice] = useState(false);

    const { sent, setSent } = useContext(RegisterContext);

    // Réinitialise le choix et l'état d'envoi après la soumission du formulaire
    useEffect(() => {
        if(sent) {
            setChoice(false);
            setSent(false);
        }
    },[sent, setChoice, setSent]);

    // Gère le changement de sélection dans le menu déroulant
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Gère la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        setChoice(true);
    };

    // Gère le retour au choix de l'offre
    const handleChangeChoice = () => {
        setChoice(false);
    }

    // On gère l'affichage de l'option au dessus du formulaire
    const choiceInChart = () => {
        if(selectedOption === "1") {
            return "Solo | Une place | 50€"
        }
        if(selectedOption === "2") {
            return "Duo | Deux places | 90€"
        }
        if(selectedOption === "4") {
            return "Familiale | Quatre places | 160€"
        }

        return "Erreur de choix"
    }

    // Si aucun choix n'est fait, affiche le formulaire de sélection d'offre
    if(!choice)
    return (
        <div className="ticket-shop">
            <form onSubmit={handleSubmit}>
                <label>
                    Choisissez une offre:
                    <select value={selectedOption} onChange={handleChange}>
                        <option value="" disabled>
                            -- Veuillez selectionner une offre --
                        </option>
                        <option value="1">Solo | Une place | 50€</option>
                        <option value="2">Duo | Deux places | 90€</option>
                        <option value="4">Familiale | Quatre places | 160€</option>
                    </select>
                </label>
                <button type="submit" disabled={!selectedOption}>
                    Ajouter au panier
                </button>
            </form>
        </div>
    );
    
    // Sinon, affiche le formulaire d'enregistrement du client
    else{
        return (
            <div>
                <button onClick={handleChangeChoice} className="go-back-button">Changer de formule</button> <div className="choice-in-chart">Votre offre: {choiceInChart()}</div>
                <CustomerRegisterForm choice={selectedOption}/>
            </div>

        );
    }
};

export default TicketShop;