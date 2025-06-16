import { useContext, useEffect, useState } from "react";
import { ErrorPanelContext } from "../../contexts/ErrorPanelProvider";

const PdfReader = ({ pdfUrl }) => {

    // On met en place le context pour les messages d'erreurs
    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);

    // On crée la state pour stocker le pdf
    const [ pdf, setPdf ] = useState(null);

    // On crée la requête pour récupérer le pdf depuis le serveur
    useEffect(() => {
        console.log(`${process.env.REACT_APP_BACKEND_URL}/${pdfUrl}`)
        let requestIsOk = false;

        try {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/${pdfUrl}`,
                {
                method : "GET",
                headers : { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
                }
            })
            .then((response) => {
                if(response.ok === true){

                    requestIsOk = true;
                }
                return response.blob();
            })
            .then((blob) => {
                console.log(blob)
                if(requestIsOk === true) {
                    console.log(blob);
                    const blobUrl = URL.createObjectURL(blob);
                    setPdf(blobUrl);

                } else {

                    setErrorType(0);
                    setErrorMessage(blob.error);
                }
            })
        } catch(error) {
            setErrorType(0);
            setErrorMessage(error.toString());
        }
        
    },[pdfUrl, setErrorMessage, setErrorType])

    if(pdf !== null) {
        return (<div>
            <a href={pdf} download>Télécharger</a></div>)
    }
};



export default PdfReader;