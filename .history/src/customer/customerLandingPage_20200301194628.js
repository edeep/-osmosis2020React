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
                    <Tab icon={<AirlineSeatReclineExtraIcon />} aria-label="flight"
                        label='Check-In'
                        
                    />
                    <Tab icon={<FlightIcon />} label="In-flight"
                       
                    />
                    <Tab icon={<SupervisorAccountIcon />} label="Admin"
                        
                    />
                </Tabs>
            </Paper>
        </div>);
    }
}