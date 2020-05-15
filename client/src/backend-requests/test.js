import axios from 'axios';

let payload = {
    'api_key': 'b57a95174a8856a231f7cdbc8eae088d',
    'format': 'json',
};

const DEFAULT_LIMIT = 3;
const URL = 'http://ws.audioscrobbler.com/2.0/';

const fetchSongs = async(limit) => {
    try {
        payload['track'] = 'numb'
        payload['limit'] = limit | DEFAULT_LIMIT
        payload['method'] = 'track.Search'
        
        const response = await axios({
            method: 'get',
            url: URL,
            params: payload,
            headers: {'user-agent': 'q1ra'}
        })
        const res = (response.data.results.trackmatches.track.map((track) => {
            return {
                'artist': track.artist,
                'track': track.name
            }
        }))
        return res
    } catch(e) {
        console.log(e);
    }
};

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
export {
    fetchSongs, 
    discover
};