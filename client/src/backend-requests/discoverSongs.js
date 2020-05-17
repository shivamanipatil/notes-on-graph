import axios from 'axios';
import {getJWT} from '../helpers/getJwt';

const discover = async () => {
    const url = '/me/discoverSongs'
    const a = await axios({
        url,
        method: 'GET',
        headers: {
          'Authorization': "Bearer "+ getJWT()
        }
    });
    return a.data;
}

export default discover;