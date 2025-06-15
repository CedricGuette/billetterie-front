import React, { useContext, useState } from 'react';
import { AuthLevelContext } from '../contexts/AuthLevelProvider';
import { ErrorPanelContext } from '../contexts/ErrorPanelProvider';

/**
 * Composant ValidateQr pour valider un QR code.
 * @returns {JSX.Element} Le formulaire de validation du QR code.
 * @description Ce composant permet à l'utilisateur d'entrer un QR code et de le valider en envoyant une requête au backend.
 */
const ValidateQr = () => {
    const [qrCode, setQrCode] = useState('');
    const { setSession } = useContext(AuthLevelContext);
    const { setLevel } = useContext(AuthLevelContext);

    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);
    
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
                if(data.error !== undefined) {
                    setErrorType(0);
                    setErrorMessage(data.error);
                } else {
                    setErrorType(2);
                    setErrorMessage(data.validated);
                }
            })
        } catch (error) {
            setErrorType(0);
            setErrorMessage({ error });
        }

    };

    // Fonction pour se déconnecter
    const handleClick = () => {
        localStorage.removeItem("SESSION");
        setSession(false);
        setLevel("ROLE_UNKNOWN");
    }

    return (
        <div className="security">
            <button onClick={handleClick}>Déconnexion</button>
            <form onSubmit={handleSubmit} className="security__panel">
                <h2>Vérification de la validité du ticket</h2>
                <input
                    type="text"
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                    placeholder="Entrer le QR code" 
                    required
                />
                <button type="submit">Valider le QR</button>
            </form>
        </div>
    );
};

export default ValidateQr;