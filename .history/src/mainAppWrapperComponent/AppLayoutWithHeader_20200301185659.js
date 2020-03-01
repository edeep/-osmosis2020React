import React from 'react';
import LoginComponent from './loginApp';
import Grid from '@material-ui/core/Grid';
export default class AppLayoutWithHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: false,
            userRole:'NA'
        }

    }

    updateIsAuthorized = (authorizedVale, userRole) => {
        this.setState({ isAuthorized: authorizedVale, userRole: userRole})
    }

    render() {

        return (
            <div> 
               <Grid container style={{display:'flex'}}>
                    <Grid item xs={9} sm={9} style={{
                        textAlign: 'center', background: '#1976d2',
                        color: 'white' }}><h1>Osmosis - RDR - Nokia Team </h1></Grid>
                    <Grid item xs={3} sm={3} style={{ textAlign: 'right', background: '#1976d2',
                        color: 'white'
                    }}><LoginComponent isAuthorized={this.updateIsAuthorized} /></Grid>
                </Grid>

              
                {this.state.isAuthorized && this.state.userRole !== 'otherRole' ?
                   <div></div> :
                    <Grid container>
                        {this.state.userRole === 'otherRole' ?
                            <Grid item xs={12} sm={12} ><h5>'You are not authorized!' </h5></Grid>: ''}
                        <Grid item xs={12} sm={12} >
                        <div style={{
                            paddingLeft:'20px'
                        }}>
                        <h5>Please use the below Login Credentails</h5>
                        <div>-------------------------------------------------------</div>
                            <div>osmosis2020manu@gmail.com - Manufacturer/Company Login</div>
                            <div>Username/Password: reduxair201adm/ React201 - Access to Admin</div>
                            <div>Username/Password: reduxair201owner/ React201 - Access to Check-In, In-Flight and Admin</div>
                            </div>
                        </Grid>
                    </Grid>
                }
                
                </div>
        );
    }
}