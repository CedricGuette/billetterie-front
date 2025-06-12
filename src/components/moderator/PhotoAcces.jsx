import { useContext, useEffect, useState } from "react";
import { ModeratorContext } from "../../contexts/ModeratorProvider";
import PhotoView from "./PhotoView";

const PhotoAcces = ({ photoUrl, customer }) => {

    const [ photo, setPhoto ] = useState(null);
    const { showPhoto, setShowPhoto } = useContext(ModeratorContext);
    
    const handleClick = () => {
        setShowPhoto(true);
    }

    useEffect(()=> {

    fetch(`${process.env.REACT_APP_BACKEND_URL + photoUrl}`,
    {
    method : "GET",
    headers : { 
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('SESSION')).value,
        }
    })
    .then((response) => response.blob())
    .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        setPhoto(blobUrl);
    })
    .catch((error) => console.error('Erreur lors de la requête:', error))

    },[]) 

    return(
    <td className="verificationPhoto" rowSpan={4}>
        {photo !== null ? <img
                        src = {photo} 
                        alt={`${customer.firstName + " " + customer.lastName}`}
                        onClick={handleClick}
                    /> : ""}
        {showPhoto ? <PhotoView photo={ photo } alt={`${customer.firstName + " " + customer.lastName}`}/> : ""}
    </td>
    )
};

export default PhotoAcces