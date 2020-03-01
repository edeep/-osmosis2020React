import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';//import FavoriteIcon from '@material-ui/icons/Favorite';
import FlightIcon from '@material-ui/icons/Flight';
import CheckInMainPageShowAllFlights from '../checkInMain/checkInMainPageShowAllFlights';
import InFlightMain from '../inFlightMain/inFlightMain';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import PropTypes from 'prop-types';
import AdminMain from '../adminMain/adminMain';


export default class AppBodyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.userRole === 'admin'?2:0,
            flightNoClicked:'NA'
        }
    }
  
   

     handleChange = (event, newValue) => {
         console.log('event',event);
         console.log('newValue', newValue);
         this.setState({ value: newValue, flightNoClicked:'NA' });
    };
    
    displaySelectedTab = (param) => {
        switch (param) {
            case 0:
                return <CheckInMainPageShowAllFlights flightNoClicked={this.state.flightNoClicked}/>
            case 1:
                return <InFlightMain />
            case 2:
                return <AdminMain />
            default:
                return <CheckInMainPageShowAllFlights flightNoClicked={this.state.flightNoClicke}/>
        }
    }
    
    render() {
        return (
            <div style={{width: '100%'}}>
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
                {this.displaySelectedTab(this.state.value)}
                </div>
            );
        }
            
    }


ReactAirlineBodyComponent.propTypes = {
    userRole: PropTypes.string
}