import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import PaymentForm from '../sharedComponents/paymentForm';
import { URL } from '../sharedComponents/constants';

import { subscriptions, services, vehicles } from '../staticStore/storeData';

export default class BuySubscriptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            expanded: 'panel1',
            setExpanded: false,
            selectedSubDetail: {},
            subscriptionData: [],
            servicesData: services,
            serviceIdsOfSelectedSub: [1, 2],
            vehicleData: vehicles,
            vehicleIdsOfSelectedSub: [2, 3],
        }
    }

    componentDidMount() {
        this.getAllSubscriptions();
    }

    getAllSubscriptions = () => {

        //http://localhost:7081/owner-site/manufacturer/getAllServices
        let url = URL + 'manufacturer/getAllSubscriptions';

        return fetch(url)
            .then(response => {
                if (!response.ok) {

                    throw Error(response.status);
                }
                return response;
            })
            .then(
                response => {
                    console.log('Came to Fetch Result ');
                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.setState({ subscriptionData: data });
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    handleChange = panel => (event, isExpanded) => {

        let value = isExpanded ? panel : false;
        this.setState({ expanded: value });
    };

    handleChangeCheckBox = event => {
        console.log('Check box clicked', event);
        let serviceIds = [];
        if (event.target.checked) {
            serviceIds = this.state.serviceIdsOfSelectedSub.concat(parseInt(event.target.value));
        } else {
            let index = this.state.serviceIdsOfSelectedSub.indexOf(parseInt(event.target.value));
            this.state.serviceIdsOfSelectedSub.splice(index, 1);
            serviceIds = this.state.serviceIdsOfSelectedSub;
        }

        this.setState({ serviceIdsOfSelectedSub: serviceIds });
    };

    handleChangeCheckBoxVehicle = event => {
        console.log('Check box clicked', event);
        let vehicleIds = [];
        if (event.target.checked) {
            vehicleIds = this.state.vehicleIdsOfSelectedSub.concat(parseInt(event.target.value));
        } else {
            let index = this.state.vehicleIdsOfSelectedSub.indexOf(parseInt(event.target.value));
            this.state.vehicleIdsOfSelectedSub.splice(index, 1);
            vehicleIds = this.state.vehicleIdsOfSelectedSub;
        }

        this.setState({ vehicleIdsOfSelectedSub: vehicleIds });
    };

    addNewService = (data) => {

    }

    updateService = (data) => {

    }

    deleteService = (data) => {

    }

    updateServicesForSub = (data) => {

    }

    updateVehiclesForSub = (data) => {

    }


    checkIfChecked = (serviceId) => {

        if (this.state.serviceIdsOfSelectedSub.indexOf(serviceId) > -1) {
            return true;
        } else {
            return false;
        }
    }

    checkIfCheckedVehicle = (vehicleId) => {

        if (this.state.vehicleIdsOfSelectedSub.indexOf(vehicleId) > -1) {
            return true;
        } else {
            return false;
        }
    }

    displayServices = (servicesData) => {
        return (
                    servicesData.map((eachServiceData, index) => {
                        return (
                            <div key={index} >
                                {eachServiceData.serviceName}
                                

                            </div>
                        );
                    })
                
        );
    }

    displayVehicles = (vehicleData) => {
        return (
  
                    vehicleData.map((eachvehicleData, index) => {
                        return (
                            <div key={index} >
                                {eachvehicleData.vehicleName}
                                

                            </div>
                        );
                    })
               
        );
    }

    displayDetailButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({ expanded: 'panel2', selectedSubDetail: param })
                }}>
                Buy/Detail
                            </Button>);

    }


    render() {
        return (
            <div >
                <ExpansionPanel expanded={this.state.expanded === 'panel1'}
                    onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography>Subscriptions </Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <MaterialTable
                            style={{ width: '100%' }}
                            title=" Available Subscriptions"
                            columns={[
                                { title: 'Subscription Name', field: 'subscriptionName' },
                                { title: 'Subscription Desc', field: 'subscriptionDesc' },
                                { title: 'Subscription Start', field: 'subscriptionStartDate', type: 'date' },
                                { title: 'Subscription End', field: 'subscriptionEndDate', type: 'date' },
                                { title: 'Price', field: 'subscriptionPrice' },
                                { title: 'Detail', field: 'subscriptionId', render: this.displayDetailButton },


                            ]}
                            data={this.state.subscriptionData}

                            options={{
                                search: true,
                                headerStyle: {
                                    backgroundColor: '#1976d2',
                                    color: 'white'
                                }
                            }}
                       
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expanded === 'panel2'}
                    onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography >Subscriptions Details</Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'flex' }}>
                        <div style={{ padding: '10px' }}>
                            <PaymentForm />
                        </div>
                        
                        <div style={{ display: 'flex' }}>
                            <div style={{ padding: '10px' }}>
                                <div><h5>Service Name:</h5> {this.state.selectedSubDetail.subscriptionName}</div>
                                <div><h5>Service Desc:</h5> {this.state.selectedSubDetail.subscriptionDesc}</div>
                            </div>

                            <div style={{ padding: '10px' }}>
                                <div><h5>Services Eligible </h5></div>
                          

                                <div style={{ height: '200px', overflowY: 'scroll' }}>
                                    {this.displayServices(this.state.servicesData)}
                                </div>
                            </div>
                            <div style={{ padding: '10px' }}>
                                <div><h5>Vehicles Eligible</h5></div>
                               
                                <div style={{ height: '200px', overflowY: 'scroll' }}>{this.displayVehicles(this.state.vehicleData)}</div>
                            </div>
                        </div>
                      


                    </ExpansionPanelDetails>
                </ExpansionPanel>


            </div>
        );
    }
}



