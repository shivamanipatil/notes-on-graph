import axios from 'axios';

const discover = async () => {
    const url = '/me/discoverSongs'
    const a = await axios({
        url,
        method: 'GET',
        headers: {
          'Authorization': "Bearer "+ localStorage.getItem('userInfo')
        }
    });
    return a.data;
}

export default discover;