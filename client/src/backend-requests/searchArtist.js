import axios from 'axios';
import {getJWT} from '../helpers/getJwt';

const searchArtist = async (artist, limit) => {
    const payload = {
        artist,
        limit
    }
    const res = await axios({
        method: 'GET',
        url: '/artist/search',
        params: payload,
        headers: {
            'Authorization': "Bearer " + getJWT()
        },
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Incorrect token")
    }
}

export default searchArtist;