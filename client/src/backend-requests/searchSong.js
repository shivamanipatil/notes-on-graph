import axios from 'axios';
import {getJWT} from '../helpers/getJwt';

const searchSong = async (track, limit) => {
    const payload = {
        track,
        limit
    }
    const res = await axios({
        method: 'GET',
        url: '/music/search',
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

export default searchSong;