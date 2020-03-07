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
            servicesData: [],
            serviceIdsOfSelectedSub: [1, 2],
            vehicleData: vehicles,
            vehicleIdsOfSelectedSub: [2, 3],
            buyStatusInfo:''
        }
    }

    componentDidMount() {
        
            this.getAllSubscriptions();
       
    }


    getServicesForSelectedSubscription = () => {

        let data = this.state.selectedSubDetail;

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = URL + 'manufacturer/getServicesBySubscription';

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {

                    throw Error(response.status);
                }
                return response;
            })
            .then(
                response => {
                    console.log('Came to Fetch Result ');
                    if (response.status !== 200) {

                        this.setState({ buyStatusInfo: 'Subscription purchase failed' });
                        return;
                    }
                    response.json().then(data => {
                        console.log('fetched data', data);
                       
                        this.setState({ servicesData: data })


                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    onBuySubscription = (event) => {

        this.setState({ buyStatusInfo: '' });
        let customerId = localStorage.getItem('customerId');
        let subscriptionId = this.state.selectedSubDetail.subscriptionId;
        let vehicleId = '-1';
        let subscriptionStartDate = '10/03/2020';
        let subscriptionEndDate = '10/12/2020';

        let url = URL + 'customer/addCustomerSubscription?customerId=' + customerId +
            '&subscriptionId=' + subscriptionId + '&vehicleId=' + vehicleId
            + '&subscriptionStartDate=' +subscriptionStartDate + '&subscriptionEndDate=' + subscriptionEndDate;

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        };
        return fetch(url, options)
            .then(response => {
                if (!response.ok) {

                    throw Error(response.status);
                }
                return response;
            })
            .then(
                response => {
                    console.log('Came to Fetch Result ');

                    if (response.status !== 200) {

                        this.setState({ buyStatusInfo: 'Subscription purchase failed' });
                        return;
                    }

                    this.setState({ buyStatusInfo: 'Subscription purchase success!' });

                    response.json().then(data => {
                        console.log('fetched data', data);
                        //this.getMyVehicles();
                        //this.handleChange('panel2');
                        //this.setState({ vinSearchError: false, showVinConfirmArea: true, vinhelperText: 'VIN sucessfully added' });
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });


    }


    getAllSubscriptions = () => {

        //http://localhost:7081/owner-site/manufacturer/getAllServices


        if (localStorage.getItem('allSubscriptionsManfacturer') === null) {
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
                            localStorage.setItem('allSubscriptionsManfacturer', JSON.stringify(data));
                        });
                    })
                .catch(
                    error => {
                        console.log('Error ', error);
                    });
        } else {
            console.log('Getting from local storahe for getAllSubscriptions data');
            this.setState({ subscriptionData: JSON.parse(localStorage.getItem('allSubscriptionsManfacturer')) });
        }

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
                                {eachServiceData.servicename + ' - ' + eachServiceData.servicedec}
                                

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
                    this.getServicesForSelectedSubscription(param);
                   
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
                    <ExpansionPanelDetails style={{ display: 'block' }}>
                        <div style={{ textAlign: 'left' }}>
                            {this.state.buyStatusInfo}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div><b>Service Name:</b> {this.state.selectedSubDetail.subscriptionName}</div>
                            <div><b>Service Desc:</b> {this.state.selectedSubDetail.subscriptionDesc}</div>
                        </div>
                        <div style={{ display: 'flex' }}>
                        <div style={{ padding: '10px', width:'40%' }}>
                                <PaymentForm buy={this.onBuySubscription}/>
                        </div>
                            <div style={{ padding: '10px', width: '30%' }}>
                                <div><h5>Services Eligible </h5></div>
                          
                                <div style={{ height: '200px', overflowY: 'scroll' }}>
                                    {this.displayServices(this.state.servicesData)}
                                </div>
                        </div>
                            <div style={{ padding: '10px', width: '30%' }}>
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



