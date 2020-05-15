import React, {useState} from 'react';
import '../App.css';
import submitLogin from '../backend-requests/submitLogin';

function Login() {
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
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    return(
      <div>
        <h2>Log in</h2>
        <form onSubmit={submitLogin}>
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
    );
}

export default Login;