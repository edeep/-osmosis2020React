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
import { URL } from '../sharedComponents/constants';

export default class CreateSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            expanded: 'panel1',
            setExpanded: false,
            selectedSubDetail: {},
            subscriptionData: [],
            servicesData: [],
            serviceIdsOfSelectedSub: [],
            vehicleData: [],
            vehicleIdsOfSelectedSub: [],
        }
    }

    handleChange = panel => (event, isExpanded) => {
      
        let value = isExpanded ? panel : false;
        this.setState({ expanded: value });
    };

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

    getAllServices = () => {

        //http://localhost:7081/owner-site/manufacturer/getAllServices
        let url = URL + 'manufacturer/getAllServices';

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
                        this.setState({ servicesData: data });
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    getAllVehicles = () => {

        //http://localhost:7081/owner-site/manufacturer/getAllServices
        let url = URL + 'manufacturer/getAllVehicles';

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
                        this.setState({ vehicleData: data });
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    componentDidMount() {
        this.getAllSubscriptions();
        this.getAllServices();
        this.getAllVehicles();
    }

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

    addNewSubsctiption = (data) => {

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = URL + 'manufacturer/addNewSubscription';

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
                        //this.setState({ servicesDataForCustomer: [] });
                        return;
                    }
                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.getAllSubscriptions();
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    udpateSubscription = (data) => {

        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = URL + 'manufacturer/updateSubscription';

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
                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.getAllSubscriptions();
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    deleteSubscription = (data) => {

        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = URL + 'manufacturer/deleteSubscription';

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
                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.getAllSubscriptions();
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }


    updateServicesForSub = () => {

        let seletedService = this.state.serviceIdsOfSelectedSub;
        let selectedServiceCommaSeparated = '';
        seletedService.forEach((eachServId, index) => {
            selectedServiceCommaSeparated = selectedServiceCommaSeparated + eachServId +','
           
        })

        selectedServiceCommaSeparated.substring(0, selectedServiceCommaSeparated.length - 1);

        let data = { serviceIds: selectedServiceCommaSeparated, subscriptionId: this.state.selectedSubDetail.subscriptionId}
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = URL + 'manufacturer/updateSubcriptionServices';

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
                    response.json().then(data => {
                        

                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });
    }

    updateVehiclesForSub = (data) => {

    }

    getServicesForSelectedSubscription = (data) => {

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
                    response.json().then(data => {
                        console.log('fetched data', data);
                        let serviceIdsOfSelectedSub = [];
                        data.forEach((eachSub, index) => {
                            serviceIdsOfSelectedSub.push(eachSub.serviceId);
                        })
                        this.setState({ serviceIdsOfSelectedSub: serviceIdsOfSelectedSub})
                        
                       
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }



    checkIfChecked = (serviceId) => {
        
        if (this.state.serviceIdsOfSelectedSub.indexOf(serviceId) > -1) {
            return true;
        } else {
            return false;
        }
    }

    checkIfCheckedVehicle = (vehicleId) => {

        if (this.state.vehicleIdsOfSelectedSub.indexOf(parseInt(vehicleId)) > -1) {
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
                                    label={eachvehicleData.make + ' ' + eachvehicleData.model + ' ' + eachvehicleData.year}
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
                    this.getServicesForSelectedSubscription(param);
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
                                { title: 'Detail', field: 'subscriptionId', editable:false, render: this.displayDetailButton },


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

                                            this.addNewSubsctiption(newData);
                                            resolve()
                                        }, 1000)
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.udpateSubscription(newData);
                                            resolve()
                                        }, 1000)
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.deleteSubscription(oldData);
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
                        <div style={{ textAlign: 'left'}}>
                            <div><b>Subscription Name:</b> {this.state.selectedSubDetail.subscriptionName}</div>
                            <div><b>Subscription Desc:</b> {this.state.selectedSubDetail.subscriptionDesc}</div>
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



