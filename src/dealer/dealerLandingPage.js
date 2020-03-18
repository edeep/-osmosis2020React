import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import DealerServices from './dealerServices';
//import DealerSubscription from './dealerSubscriptions';
import DealerEnquiry from './dealerEnquiry';

export default class DealerLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    displaySelectedTab = (param) => {
        switch (param) {
            case 0:
                return <DealerServices />
            case 1:
                return <DealerEnquiry />
            default:
                return <DealerServices />
        }
    }

    handleChange = (event, newValue) => {
        console.log('event', event);
        console.log('newValue', newValue);
        this.setState({ value: newValue });

    };

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
                   
                    <Tab label="Services"

                    />

                    <Tab label="Enquiry"

                    />
                    
                </Tabs>
            </Paper>
            {this.displaySelectedTab(this.state.value)}
        </div>);
    }
}