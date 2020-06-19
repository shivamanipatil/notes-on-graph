import axios from 'axios';
import {getJWT} from '../helpers/getJwt';

const similarSong = async (track, artist, limit) => {
    const payload = {
        track,
        limit,
        artist
    }
    const res = await axios({
        method: 'GET',
        url: '/recommend/tracks',
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

export default similarSong;