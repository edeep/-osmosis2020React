import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

export default class CustomerLandingPage extends React.Component {

    render() {
        return (<div>
            <Paper square>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs example"
                >
                    <Tab icon={<AirlineSeatReclineExtraIcon />} 
                        label='My Vehicles'
                        
                    />
                    <Tab icon={<FlightIcon />} label="My Subscriptions"
                       
                    />
                    <Tab icon={<SupervisorAccountIcon />} label="My Services"
                        
                    />
                    <Tab icon={<SupervisorAccountIcon />} label="My Requests"

                    />
                    <Tab icon={<SupervisorAccountIcon />} label="My Enquiry"

                    />
                    <Tab icon={<SupervisorAccountIcon />} label="My Feedback"

                    />
                </Tabs>
            </Paper>
        </div>);
    }
}