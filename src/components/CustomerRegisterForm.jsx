import React, { useState, useContext, useEffect } from "react";
import { RegisterContext } from "../contexts/RegisterProvider";
import { validEmail, validName, validPassword, validPhoneNumber } from "./customer/Regex";
import { ErrorPanelContext } from "../contexts/ErrorPanelProvider";

/**
 * Composant pour enregistrer un nouveau client.  
 * @param {Object} props - Les propriétés du composant, notamment le choix de l'utilisateur pour le nombre de tickets.
 * @returns {JSX.Element} Le formulaire d'enregistrement du client.
 * @description Ce composant gère l'enregistrement d'un nouveau client en collectant les informations nécessaires et en les envoyant à l'API.
 */
const CustomerRegisterForm = (props) => {

    // On met en place les éléments pour après la validation du formulaire
    const { setSent } = useContext(RegisterContext);

    // On importe le composant React et useState pour gérer l'état du formulaire
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        photo: null,
    });

    // On crée les useStates pour afficher les erreurs en entrée
    const [ errFirstName, setErrFirstName ] = useState(null);
    const [ errLastName, setErrLastName ] = useState(null);
    const [ errEmail, setErrEmail ] = useState(null);
    const [ errPhoneNumber, setErrPhoneNumber ] = useState(null);
    const [ errPassword, setErrPassword ] = useState(null);
    const [ errConfirmPassword, setErrConfirmPassword ] = useState(null);
    const [ errPhotoSize, setErrPhotoSize ] = useState(null);
    const [ errPhotoType, setErrPhotoType ] = useState(null);
    const [ errInForm, setErrInForm ] = useState(false);

    const { setErrorMessage, setErrorType } = useContext(ErrorPanelContext);

    // On crée les fonctions qui gèrent les erreurs d'entrées

    const validateFirstName = () => {

        if(!validName.test(form.firstName)) {
            setErrFirstName(false);
        } else {
            setErrFirstName(true);
        }
    }

    const validateLastName = () => {

        if(!validName.test(form.lastName)) {
            setErrLastName(false);
        } else {
            setErrLastName(true);
        }
    }

    const validateEmail = () => {

        if(!validEmail.test(form.email)) {
            setErrEmail(false);
        } else {
            setErrEmail(true);
        }
    }

    const validatePhoneNumber = () => {

        if(!validPhoneNumber.test(form.phoneNumber)) {
            setErrPhoneNumber(false);
        } else {
            setErrPhoneNumber(true);
        }
    }   

        const validatePassword = () => {
        
        if(!validPassword.test(form.password)) {
            setErrPassword(false);
        } else {
            setErrPassword(true);
        }
    }

    const validateConfirmPassword = () => {
        
        if(form.confirmPassword === form.password && form.confirmPassword !== (null || "")) {
            setErrConfirmPassword(true);
        } else {
            setErrConfirmPassword(false);
        }
    }

    const validatePhoto = () => {
        if(form.photo !== null) {
            if(form.photo.size >= 2097152) {
                setErrPhotoSize(false);
            } else {
                setErrPhotoSize(true);
            }
            if(form.photo.type === ("image/jpeg" || "image/png" || "image/jpg")) {
                setErrPhotoType(true);
            } else {
                setErrPhotoType(false);
            }
        }
    }

    const validateForm = () => {   
        if(errFirstName && (errLastName && (errEmail && (errPhoneNumber && (errPassword && (errConfirmPassword && (errPhotoSize && (errPhotoType && true)))))))) {
            setErrInForm(true);
        } else {
            setErrInForm(false);
        }
    }

    // Pour actualiser le statut de la photo quand selectionnée
    useEffect(() => {
        validatePhoto();
        // On ne peut pas ajouter la fonction au tableau de dépendance sinon on crée une boucle de rendu infini
        // eslint-disable-next-line
    },[form.photo])

    // On récupère le choix de l'utilisateur et on prépare le format de la requête pour l'API
    const customer = JSON.stringify(
        {
            firstName: `${form.firstName}`,
            lastName: `${form.lastName}`,
            phoneNumber: `${form.phoneNumber}`,
            username: `${form.email}`,
            password: `${form.password}`,
            tickets: [
                {
                eventCode: "1",
                howManyTickets: props.choice
                }
            ]
        }
    );
    
    // On crée un objet Blob pour le fichier photo
    const blob = new Blob([customer], { type: "application/json" });
    const formData = new FormData();
    formData.append("customer", blob);
    formData.append("photo", form.photo);

    // On met en place la fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // On vérifie l'intégrité des réponses dans le formulaire
        if(errInForm){
            let requestIsOk = false;
            //On evoie les informations en reqête
            try {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
                    method: "POST",
                    headers: {
                    
                    },
                    body: formData
                    
                })
                .then((res) => {
                    if (res.ok === true) {
                        requestIsOk = true;
                    }
                    return res.json();
                })
                .then((data) => {
                    if(requestIsOk === true){
                        setErrorType(2);
                        setErrorMessage(data.created);
                        setSent(true);

                    } else {
                        setErrorType(0);
                        setErrorMessage(data.error);
                    }
                });
            } catch (error) {
                setErrorType(0);
                setErrorMessage(error);
            }
        } else {
            createErrListArray();
        }
    };

    // On met en place la fonction de changement d'état du formulaire
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    // Fonction qui crée les erreurs de saisies à afficher dans la boite de dialogue
    const createErrListArray = () => {

        let errListArray = [];
        
        if(!errFirstName){
            errListArray.push("Le prénom n'est pas valide");
        }
        if(!errLastName){
            errListArray.push("Le nom n'est pas valide");
        }
        if(!errEmail){
            errListArray.push("L'adresse e-mail n'est pas valide");
        }
        if(!errPhoneNumber){
            errListArray.push("Le numéro de téléphone n'est pas valide");
        }
        if(!errPassword){
            errListArray.push("Le mot de passe n'est pas valide");
        }
        if(!errConfirmPassword){
            errListArray.push("La confirmation du mot de passe ne correspond pas au mot de passe");
        }
        if(!errPhotoSize){
            errListArray.push("La photo pèse plus lourd que 2Mo");
        }
        if(!errPhotoType){
            errListArray.push("Le format de la photo n'est pas accepté");
        }

        setErrorType(1);
        setErrorMessage(errListArray);
    }

    return (
        <form onSubmit={handleSubmit} className="customer-register-form">
            <div>
                <label>
                    Prénom:
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        onBlur={validateFirstName}
                        className={errFirstName === null ? "" : ( !errFirstName === true ? "unvalid" : "valid" )}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        onBlur={validateLastName}
                        className={errLastName === null ? "" : ( !errLastName === true ? "unvalid" : "valid" )}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    E-mail:
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={validateEmail}
                        className={errEmail === null ? "" : ( !errEmail === true ? "unvalid" : "valid" )}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Numéro de téléphone:
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        onBlur={validatePhoneNumber}
                        className={errPhoneNumber === null ? "" : ( !errPhoneNumber === true ? "unvalid" : "valid" )}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Mot de passe:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={validatePassword}
                        className={errPassword === null ? "" : ( !errPassword === true ? "unvalid" : "valid" )}
                        required
                    />
                    <span className="info-password" >Minimum 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial</span>
                
                </label>
            </div>
            <div>
                <label>
                    Confirmez mot de passe:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={validateConfirmPassword}
                        className={errConfirmPassword === null ? "" : ( !errConfirmPassword === true ? "unvalid" : "valid" )}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Photo de votre carte d'identité:
                    <input
                        type="file"
                        name="photo"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleChange}
                        className="file-input"
                        required
                    />
                <div className={ errPhotoType === null ? "file-input-info" : (!errPhotoType === true ? "file-input-info unvalid" : "file-input-info valid")}>Formats acceptés: JPG, JPEG, PNG </div>
                <div className={ errPhotoSize === null ? "file-input-info" : (!errPhotoSize === true ? "file-input-info unvalid" : "file-input-info valid")} >Taille maximale: 2 Mo</div>
                </label>
            </div>
            <button type="submit" onPointerEnter={validateForm} onSubmit={handleSubmit}>Réservez vos tickets</button>
        </form>
        
    );
};

export default CustomerRegisterForm;