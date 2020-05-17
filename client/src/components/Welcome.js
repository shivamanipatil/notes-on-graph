import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

const Welcome = (props) => {
    return(
        <div>
            <h1>Welcome Home</h1>
            <h2>Welcome to notes on graph</h2>
            <button onClick={() => props.history.push('/login')}>Login</button>
        </div>  
    );    
};

export default withRouter(Welcome);