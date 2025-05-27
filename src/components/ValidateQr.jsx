import React, { useState } from 'react';

/**
 * Composant ValidateQr pour valider un QR code.
 * @returns {JSX.Element} Le formulaire de validation du QR code.
 * @description Ce composant permet à l'utilisateur d'entrer un QR code et de le valider en envoyant une requête au backend.
 */
const ValidateQr = () => {
    const [qrCode, setQrCode] = useState('');
    const [response, setResponse] = useState(null);
    
    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/security/` + qrCode, {
                method: "GET",
                headers: { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                }
            })
            .then((res) =>  res.json())
            .then((data) => {
            setResponse(data[0]);
            })
        } catch (error) {
            setResponse({ error: 'La requête a échoué' });
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="Entrer le QR code" 
                required
            />
            <button type="submit">Valider le QR</button>
            {response && (
                <div>
                    {response}
                </div>
            )}
        </form>
    );
};

export default ValidateQr;