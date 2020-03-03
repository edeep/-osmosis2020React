import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import MyVehicles from './myVehicles';
import BuySubscriptions from './buySubscriptions';
import MySubscriptions from './mySubscriptions';

export default class CustomerLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
    }



    handleChange = (event, newValue) => {
        console.log('event', event);
        console.log('newValue', newValue);
        this.setState({ value: newValue });
        
    };

    displaySelectedTab = (param) => {
        switch (param) {
            case 0:
                return <MyVehicles />
            case 1:
                return <BuySubscriptions />
            case 2:
                return <MySubscriptions />
            default:
                return <MyVehicles />
        }
    }
    
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
                    <Tab 
                        label='My Vehicles'
                        
                    />
                    <Tab label="Buy Subscriptions"

                    />
                    <Tab  label="My Subscriptions"
                       
                    />
                    <Tab  label="My Services"
                        
                    />
                    <Tab  label="My Requests"

                    />
                    <Tab  label="My Enquiry"

                    />
                    <Tab  label="My Feedback"

                    />
                </Tabs>
            </Paper>
            {this.displaySelectedTab(this.state.value)}
        </div>);
    }
}