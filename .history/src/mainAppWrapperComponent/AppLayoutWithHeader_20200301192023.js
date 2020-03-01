import React from 'react';
import LoginComponent from './loginApp';
import Grid from '@material-ui/core/Grid';
import CompanyLandingPage from '../company/companyLandingPage';
import DealerLandingPage from '../dealer/dealerLandingPage';
import CustomerLandingPage from '../customer/customerLandingPage';

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
                    this.state.userRole === 'manu' ? <CompanyLandingPage /> :
                        this.state.userRole === 'dealer' ? <DealerLandingPage/> :
                    this.state.userRole === 'cust' ? <CustomerLandingPage/> :    
                    <Grid container>
                        {this.state.userRole === 'otherRole' ?
                            <Grid item xs={12} sm={12} ><h5>'You are not authorized!' </h5></Grid>: ''}
                        <Grid item xs={12} sm={12} >
                        <div style={{paddingLeft:'20px'}}>
                        <h5>Please use the below Login Credentails</h5>
                        <div>-------------------------------------------------------</div>
                            <div>osmosis2020manu@gmail.com/Osmosis2020 - Manufacturer/Company Login</div>
                            <div>osmosis2020dealer@gmail.com - Dealer Login</div>
                            <div>osmosis2020cust01@gmail.com- Customer Login</div>
                            </div>
                        </Grid>
                    </Grid>
                }
                
                </div>
        );
    }
}