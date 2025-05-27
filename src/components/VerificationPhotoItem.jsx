
import { useContext } from 'react';
import { ModeratorContext } from './ModeratorProvider';
import ModerationButton from './ModerationButton';

const VerificationPhotoItem = ({ id, url }) => {

    const { deleted } = useContext(ModeratorContext);

    return(
        <div className="ModerationCard" key={id}>
            {deleted ? "" : <img
                src = {process.env.REACT_APP_BACKEND_URL + url} 
                alt={`${id}`} 
                style={{ maxWidth: '200px', display: 'block', marginTop: '8px' }} 
                /> 
            } {deleted ? "" : <ModerationButton id={id} />}
        </div>
    )
}
export default VerificationPhotoItem;