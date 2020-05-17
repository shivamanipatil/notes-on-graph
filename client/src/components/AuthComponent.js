import React, {Component} from 'react';
import {getJWT} from '../helpers/getJwt';
import profile from '../backend-requests/getProfile';
import {withRouter} from 'react-router-dom';

class AuthenticatedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }
    async componentDidMount() {
        const jwt = getJWT();
        if(!jwt) {
            this.props.history.push('/login');
            alert('Token not found. Login with credentials.');
            return;
        }
        try {
            const user = await profile(jwt);
            this.setState({user})
        } catch(e) {
            localStorage.removeItem('userInfo');
            this.props.history.push('/login');
            alert('Incorrect token! Login again.');
        }
        
    }
    render() {
        if(this.state.user === undefined) {
            return (
                <div><h1>Loading...</h1></div>
            )
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
export default withRouter(AuthenticatedComponent);