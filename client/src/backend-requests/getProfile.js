import axios from 'axios';

const profile = async (jwtToken) => {
    const res = await axios({
        method: 'GET',
        url: '/users/me',
        headers: {
            'Authorization': "Bearer "+ jwtToken
    }});
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Incorrect token")
    }
}

export default profile;