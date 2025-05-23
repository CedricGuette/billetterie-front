import React, { useState } from 'react';

const ValidateQr = () => {
    const [qrCode, setQrCode] = useState('');
    const [response, setResponse] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/security/" + qrCode, {
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