import axios from 'axios'; 
import {getJWT} from '../helpers/getJwt';

const unlikeSong = async (id) => {
    const res = await axios({
        method: 'DELETE',
        url: '/music/unlike/track/' + id,
        headers: {
            'Authorization': "Bearer "+ getJWT()
    }});
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Incorrect token")
    }
}

export default unlikeSong;