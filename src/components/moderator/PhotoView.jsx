import React, { useContext } from "react";
import { ModeratorContext } from "../../contexts/ModeratorProvider";

const PhotoView = ({ photo, alt }) => {

    const { setShowPhoto } = useContext(ModeratorContext);

    const handleClick = () => {
        setShowPhoto(false);
    }
    return (
        <div className="photoview">
            <div className="close-cross" onClick={handleClick}>X</div>
            <img src={photo} alt={alt} onClick={handleClick} />
        </div>
    )
}

export default PhotoView;