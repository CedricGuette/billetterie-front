import React, { useState } from "react";

const TicketShop = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/tickets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ offer: selectedOption }),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout au panier.");
            }
            alert(`Offre ajoutée au panier: ${selectedOption}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Choisissez une offre:
                <select value={selectedOption} onChange={handleChange}>
                    <option value="" disabled>
                        -- Selectionnez --
                    </option>
                    <option value="simple">Offre simple</option>
                    <option value="duo">Offre duo</option>
                    <option value="familial">Offre familiale</option>
                </select>
            </label>
            <button type="submit" disabled={!selectedOption || loading}>
                {loading ? "Ajout..." : "Ajouter au panier"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
    );
};

export default TicketShop;