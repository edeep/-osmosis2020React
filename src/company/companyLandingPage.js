import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import CreateService from './createServices';
import CreateSubscription from './createSubscriptions';
import AnalyticsMain from './analyticsMain';
import ManfacturerEnquiry from './manufacturerEnquiry';

export default class CompanyLandingPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 4
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
                return <AnalyticsMain/>
            case 1:
                return <CreateService />
            case 2:
                return <CreateSubscription />
            case 4:
                return <ManfacturerEnquiry />
            default:
                return <AnalyticsMain  />
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
                        label='Analytics'

                    />
                    <Tab label="Create Services"

                    />
                    <Tab label="Create Subscriptions"

                    />
                    
                    <Tab label="RDR "

                    />
                    
                    <Tab label="Customer Enquiry"

                    />
                    <Tab label="Customer Feedback"

                    />
                </Tabs>
            </Paper>
            {this.displaySelectedTab(this.state.value)}
        </div>);
    }
}