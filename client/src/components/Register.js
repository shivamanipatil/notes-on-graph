import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import styles from '../static/css/login.module.css';

const Register = (props) => {
  
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(event.target.name);
    if(name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setName(value);
    }
    console.log(Name, email, password)
  }

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
        name: Name,
        email,
        password
    }
    try {
      const res = await axios({
        method: 'POST',
        url: '/users',
        data: payload
      });
      console.log(res)
      if(res.status === 201) {
          localStorage.setItem('userInfo', res.data.token.replace('"', ""));
          props.history.push('/profile');
      }
    } catch(error) {
      //axios thing need throws error for 400 status code 
      props.history.push('/Register');
      alert('Please try again')
    }
  }
  
    return(
      <div className={styles.login_page}>
        <div className={styles.form}>
        <form onSubmit={submit}>
        <div className="form-input">
            <input 
              type="text"
              name="name"
              placeholder="Name"
              value={Name}
              onChange={handleChange}
            />
          </div>
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
          <button>Register</button>
        </form>
        </div>
      </div>
    );
}

export default withRouter(Register);