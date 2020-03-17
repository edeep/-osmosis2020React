import React from 'react';
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
         localStorage.clear();
        
         let role = 'otherRole';
         if (response.profileObj.email === 'osmosis2020manu@gmail.com')
         {
             role = 'manu';
             localStorage.setItem('manuId', 1);
         } else if (response.profileObj.email === 'osmosis2020dealer@gmail.com') {
             role = 'dealer';
             localStorage.setItem('dealerId', 1);
         } else if (response.profileObj.email === 'osmosis2020cust01@gmail.com') {
             role = 'cust';
             localStorage.setItem('customerId', 1);
         } else if (response.profileObj.email === 'osmosis2020cust02@gmail.com') {
             role = 'cust';
             localStorage.setItem('customerId', 2);
         } else {
             role = 'cust';
             localStorage.setItem('customerId', 3);
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
                        clientId="195037241696-cstlolklioasl2290bvns5tebcqovp8j.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogleOnSucess}
                        onFailure={this.responseGoogleOnFailure}
                        cookiePolicy={'single_host_origin'}
                    /> :
                    <GoogleLogout
                        clientId="195037241696-cstlolklioasl2290bvns5tebcqovp8j.apps.googleusercontent.com"
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