import React from 'react';

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
                        disabled={!(this.props.userRole === 'staff' || this.props.userRole === 'owner')}
                    />
                    <Tab icon={<FlightIcon />} label="In-flight"
                        disabled={!(this.props.userRole === 'staff' || this.props.userRole === 'owner')}
                    />
                    <Tab icon={<SupervisorAccountIcon />} label="Admin"
                        disabled={!(this.props.userRole === 'admin' || this.props.userRole === 'owner')}
                    />
                </Tabs>
            </Paper>
        </div>);
    }
}