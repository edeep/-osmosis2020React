import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

export default class DealerLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }



    handleChange = (event, newValue) => {
        console.log('event', event);
        console.log('newValue', newValue);

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
                    
                    <Tab label="Subscriptions"

                    />
                    <Tab label="Services"

                    />
                    <Tab label="Enquiry"

                    />
                    
                </Tabs>
            </Paper>
        </div>);
    }
}