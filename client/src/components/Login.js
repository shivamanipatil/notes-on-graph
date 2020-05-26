import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import styles from '../static/css/login.module.css';

const Login = (props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    if(name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
    console.log(email, password)
  }

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
        email: email,
        password: password
    }
    try {
      const res = await axios({
        method: 'POST',
        url: '/users/login',
        data: payload
      });
      console.log(res)
      if(res.status === 200) {
          localStorage.setItem('userInfo', res.data.token.replace('"', ""));
          props.history.push('/profile');
      }
    } catch(error) {
      //axios thing need throws error for 400 status code 
      props.history.push('/Login');
      alert('Incorrect login details!')
    }
  }
  
    return(
      <div className={styles.login_page}>
        <div className={styles.form}>
        <form onSubmit={submit}>
          <div className="form-input">
            <input 
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <input 
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button>Log in</button>
        </form>
        </div>
      </div>
    );
}

export default withRouter(Login);