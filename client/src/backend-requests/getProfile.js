import axios from 'axios';

const profile = async () => {
    const res = await axios({
        method: 'GET',
        url: '/users/me',
        headers: {
            'Authorization': "Bearer "+ localStorage.getItem('userInfo')
    }});
    if(res.status === 200) {
        return res.data
    } else {
        return "Some error"
    }
}

export default profile;