import axios from 'axios';

const submit = async (event) => {
    event.preventDefault();
    console.log(event.target.elements.email.value, event.target.elements.password.value)
    const payload = {
        email: event.target.elements.email.value,
        password: event.target.elements.password.value
    }
    const res = await axios({
        method: 'POST',
        url: '/users/login',
        data: payload
    });
    if(res.status === 200) {
        localStorage.setItem('userInfo', res.data.token.replace('"', ""))
    }
}

export default submit;