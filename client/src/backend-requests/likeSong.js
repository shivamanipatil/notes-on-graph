import axios from 'axios';
import { getJWT } from '../helpers/getJwt';

const likeSong = async (track) => {
    const payload = {
        track,
        limit: 4
    }
    const res = await axios({
        method: 'POST',
        url: '/music/like/track',
        params: payload,
        headers: {
            'Authorization': "Bearer "+ getJWT()
    }});
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Incorrect token")
    }
}

export default likeSong;