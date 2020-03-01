import React from 'react';
//import Button from '@material-ui/core/Button';
//import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';

export default class LoginComponent extends React.Component {
   //isAuthorized={this.updateIsAuthorized}
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false,
            userMessage: ''
        }
    }
    
     responseGoogleOnSucess = (response) => {
         console.log(response);
         this.setState({ userLoggedIn: true, userMessage: response.profileObj.name });
         let role = 'otherRole';
         if (response.profileObj.email === 'reduxair201adm@gmail.com')
         {
             role = 'admin';
         } else if (response.profileObj.email === 'reduxair201stf@gmail.com') {
             role = 'staff';
         } else if (response.profileObj.email === 'reduxair201owner@gmail.com') {
             role = 'owner';
         }    
         this.props.isAuthorized(true, role);
    }


    responseGoogleOnFailure = (response) => {
        console.log(response);
        this.setState({ userLoggedIn: false, userMessage: 'Login failed.' });
        this.props.isAuthorized(false,'NA');
    }

    logout = (response) => {
        console.log(response);
        this.setState({ userLoggedIn: false, userMessage: '' });
        this.props.isAuthorized(false,'NA');
    }

    render() {
      

        return (
            <div>
                <div>{this.state.userMessage}</div>

                <div>{!this.state.userLoggedIn ?
                    <GoogleLogin
                        clientId="477163276602-qoaq5gonc65orfkccrrch8qm4mon1mqv.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogleOnSucess}
                        onFailure={this.responseGoogleOnFailure}
                        cookiePolicy={'single_host_origin'}
                    /> :
                    <GoogleLogout
                        clientId="477163276602-qoaq5gonc65orfkccrrch8qm4mon1mqv.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                    />}
                </div>
                </div>
                );
                }
}

LoginComponent.propTypes = {
    isAuthorized: PropTypes.func
}