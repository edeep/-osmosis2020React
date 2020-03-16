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
        //Enable only for local testing..
       // localStorage.clear();
       // localStorage.setItem('customerId', 1);
        
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
                    (this.state.userRole === 'manu' ? <CompanyLandingPage /> :
                        this.state.userRole === 'dealer' ? <DealerLandingPage /> :
                            this.state.userRole === 'cust' ? <CustomerLandingPage /> : <div></div>)
                    :
                    <Grid container>
                        {this.state.userRole === 'otherRole' ?
                            <Grid item xs={12} sm={12} ><h5>'You are not authorized!' </h5></Grid> : ''}
                        <Grid item xs={12} sm={12} >
                            <div style={{ paddingLeft: '20px' }}>
                                <h1>Welcome to Osmosis 2020 !</h1>
                                <li>Balamurugan Jothilingam</li>
                                <li>Pradeep Dhavakumar</li>
                                <li>Siviah Polamreddy</li>
                                <li>Balaji Sridharan</li>
                            </div>
                        </Grid>
                    </Grid>
                }
                
                
                </div>
        );
    }
}