import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import styles from '../static/css/welcome.module.css';

const Welcome = (props) => {
    return(
        <div className={styles.divClass}>
            <h1 className={styles.heading}>NOTES ON GRAPH</h1>
            <button className={styles.button} onClick={() => props.history.push('/login')}>
                <span>Login</span>
            </button>
        </div>  
    );    
};

export default withRouter(Welcome);