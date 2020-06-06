import React from 'react';
import {withRouter} from 'react-router-dom';
import styles from '../static/css/welcome.module.css';
import {getJWT} from '../helpers/getJwt';

const Welcome = (props) => {
    const handleLogin = () => {
        const jwt = getJWT();
        if(!jwt) {
            props.history.push('/login');
            return;
        } else {
            props.history.push('/home');
        }
    }
    return(
        <div className={styles.divClass}>
            <h1 className={styles.heading}>NOTES ON GRAPH</h1>
            <button className={styles.button} onClick={() => handleLogin()}>
                <span>Login</span>
            </button><br/>
            <button className={styles.button} onClick={() => props.history.push('/register')}>
                <span>Register</span>
            </button>
        </div>  
    );    
};

export default withRouter(Welcome);