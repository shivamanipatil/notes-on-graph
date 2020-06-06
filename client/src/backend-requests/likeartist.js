import axios from 'axios'; 
import {getJWT} from '../helpers/getJwt';

const likeArtist = async (artist) => {
    const res = await axios({
        method: 'POST',
        url: '/music/like/artist',
        params: {
            artist
        },
        headers: {
            'Authorization': "Bearer "+ getJWT()
    }});
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Incorrect token")
    }
}

export default likeArtist;