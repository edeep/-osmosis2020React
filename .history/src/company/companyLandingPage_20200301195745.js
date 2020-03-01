import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

export default class CompanyLandingPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 0
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
                    <Tab label="RDR "

                    />
                    <Tab label="Create Subscriptions"

                    />
                  
                    
                    <Tab label="Customer Enquiry"

                    />
                    <Tab label="Customer Feedback"

                    />
                </Tabs>
            </Paper>
        </div>);
    }
}