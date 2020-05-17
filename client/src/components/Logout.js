import React from 'react';
import {withRouter} from 'react-router-dom';

const Logout = (props) => {
    localStorage.removeItem('userInfo');
    props.history.push('/');
    return(
        <div></div>
    );
}

export default withRouter(Logout);