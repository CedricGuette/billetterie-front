import React, { useContext } from "react";
import { ModeratorContext } from "../../contexts/ModeratorProvider";

const PhotoView = ({ photo }) => {

    const { setShowPhoto } = useContext(ModeratorContext);

    const handleClick = () => {
        setShowPhoto(false);
    }
    return (
        <div className="photoview">
            <div className="close-cross" onClick={handleClick}>X</div>
            <img src={process.env.REACT_APP_BACKEND_URL + photo.url} alt={photo.id} onClick={handleClick} />
        </div>
    )
}

export default PhotoView;