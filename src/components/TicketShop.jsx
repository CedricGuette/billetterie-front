import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from 'react';
import { AuthLevelContext } from './AuthLevelProvider';




const TicketShop = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [choice, setChoice] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (choice){
            return navigate("/reservation");
        }
    },[choice]);

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        document.cookie = localStorage.setItem("TICKET_CHOICE" , selectedOption);
        setChoice(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Choisissez une offre:
                    <select value={selectedOption} onChange={handleChange}>
                        <option value="" disabled>
                            -- Veuillez selectionner une offre --
                        </option>
                        <option value="1">Solo</option>
                        <option value="2">Duo</option>
                        <option value="4">Familiale</option>
                    </select>
                </label>
                <button type="submit" disabled={!selectedOption}>
                    Ajouter au panier
                </button>
            </form>
        </div>
    );
};

export default TicketShop;