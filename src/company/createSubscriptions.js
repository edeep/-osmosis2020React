import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { subscriptions, services, vehicles } from '../staticStore/storeData';

export default class CreateSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            expanded: 'panel1',
            setExpanded: false,
            selectedSubDetail: {},
            subscriptionData: subscriptions,
            servicesData: services,
            serviceIdsOfSelectedSub: [1, 2],
            vehicleData: vehicles,
            vehicleIdsOfSelectedSub: [2,3],
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
            <FormControl component="fieldset" >
               
                <FormGroup>
                    {servicesData.map((eachServiceData, index) => {
                        return (
                            <div key={index} >
                                <FormControlLabel
                                    control={<Checkbox color='primary' onChange={this.handleChangeCheckBox}
                                        value={eachServiceData.serviceId} checked={this.checkIfChecked(eachServiceData.serviceId)} />}
                                    label={eachServiceData.servicename }
                                />

                            </div>
                        );
                    })}
                </FormGroup>

            </FormControl>
        );
    }

    displayVehicles = (vehicleData) => {
        return (
            <FormControl component="fieldset" >
                
                <FormGroup>
                    {vehicleData.map((eachvehicleData, index) => {
                        return (
                            <div key={index} >
                                <FormControlLabel
                                    control={<Checkbox color='primary' onChange={this.handleChangeCheckBoxVehicle}
                                        value={eachvehicleData.vehicleId} checked={this.checkIfCheckedVehicle(eachvehicleData.vehicleId)} />}
                                    label={eachvehicleData.vehicleName}
                                />

                            </div>
                        );
                    })}
                </FormGroup>

            </FormControl>
        );
    }

    displayDetailButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({ expanded:'panel2', selectedSubDetail:param})
                }}>
            Detail
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
                        <Typography>Subscriptions Summary</Typography>
                       
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <MaterialTable
                            style={{width:'100%'}}
                            title="Subscription List"
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
                            editable={{
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {

                                            this.addNewService(newData);
                                            resolve()
                                        }, 1000)
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.updateService(newData);
                                            resolve()
                                        }, 1000)
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.deleteService(oldData.serviceId);
                                            resolve()
                                        }, 1000)
                                    })
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
                    <ExpansionPanelDetails style={{display:'block'}}>
                        <div>
                            <div><b>Service Name:</b> {this.state.selectedSubDetail.subscriptionName}</div>
                            <div><b>Service Desc:</b> {this.state.selectedSubDetail.subscriptionDesc}</div>
                        </div>
                     
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '50%' }}>
                                <div><h5>Services Attached </h5></div>
                                <Button variant="contained" color="primary" onClick={this.updateServicesForSub}>
                         Update Services
                            </Button>
                                
                                <div style={{ height: '200px', overflowY: 'scroll' }}>
                                    {this.displayServices(this.state.servicesData)}
                                </div>
                            </div>
                            <div style={{ width: '50%' }}>
                                <div><h5>Vehicles Attached</h5></div>
                                <Button variant="contained" color="primary" onClick={this.updateVehiclesForSub}>
                                    Update Vehicles
                                </Button>
                                <div style={{ height: '200px', overflowY: 'scroll' }}>{this.displayVehicles(this.state.vehicleData)}</div>
                            </div>
                        </div>
                          
                    
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            
                   
            </div>
        );
    }
}



