import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
//import { custSubscriptions} from '../staticStore/storeData';
import Button from '@material-ui/core/Button';
import { URL } from '../sharedComponents/constants';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class MySubscriptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            expanded: 'panel1',
            setExpanded: false,
            subscriptionData: [],
            selectedSubDetail: {},
            customervehiclesData: [],
            selectedVIN:'-1'


        }
    }

    componentDidMount() {
        this.getAllSubscriptions();
        this.getMyVehicles();
    }

    getAllSubscriptions = () => {
        let customerId = localStorage.getItem('customerId');

        //http://localhost:7081/owner-site/manufacturer/getAllServices
        let url = URL + 'customer/getAllSubscriptions?customerId=' + customerId ;

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



    getMyVehicles = () => {

        let customerId = localStorage.getItem('customerId');
        //http://localhost:7081/owner-site/customer/getMyVehicles?customerId=1

        let url = URL + 'customer/getMyVehicles?customerId=' + customerId;

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

                    if (response.status !== 200) {
                        this.setState({ customervehiclesData: [] });
                        return;
                    }

                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.setState({ customervehiclesData: data });
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    populateDropDownValue = () => {

        return this.state.customervehiclesData.map((dt, i) => {
            return (
                <MenuItem
                    key={i}
                    value={dt.vin}
                    data-vehicle-index={i}
                    style={{ background: '#1976d2', color: 'white' }}
                >
                    {dt.vin} - {dt.make} - {dt.model}- {dt.year}
                </MenuItem>
            );
        });


    }

    handleChangeForVINSelect = event => {
        let selectedVIN = event.target.value;
        
        this.setState({ selectedVIN: selectedVIN });
        
    };

    displayDetailButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({ expanded: 'panel2', selectedSubDetail: param })
                }}>
                Detail
                            </Button>);

    }

    updateVINForSubscription = () => {
        let custSubId = this.state.selectedSubDetail.subscriptionId;
        let vin = this.state.selectedVIN;
     
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
         
        };

        let url = URL + 'customer/addVinForSubscription?custsubscriptionId=' + custSubId +
            '&vin='+vin;

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
                        this.handleChange('panel1');
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    
    
    displayTransferButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    //this.setState({ expanded: 'panel2', selectedSubDetail: param })
                }}>
                Transfer
                            </Button>);

    }
    displayCancelButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    //this.setState({ expanded: 'panel2', selectedSubDetail: param })
                }}>
                Cancel
                            </Button>);

    }
    displayRefundButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);}}>
               Refund
                            </Button>);

    }

    displayStatus = (param) => {
        console.log(param);
        return (
           <div>
                Status
            </div>
                          );

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
                        <Typography>My Sub </Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>

                        <MaterialTable
                            style={{ width: '100%' }}
                            title="My Subscriptions"
                            columns={[
                                { title: 'Subscription Name', field: 'subscriptionName' },
                                { title: 'VIN', field: 'vin' },
                                { title: 'Subscription Start', field: 'subscriptionStartDate', type: 'date' },
                                { title: 'Subscription End', field: 'subscriptionEndDate', type: 'date' },
                                { title: 'Price', field: 'subscriptionPrice' },
                                { title: 'Status', field: 'subscriptionId', render: this.displayStatus },
                                { title: 'Detail', field: 'subscriptionId', render: this.displayDetailButton },
                                { title: 'Transfer', field: 'subscriptionId', render: this.displayTransferButton },
                                { title: 'Cancel', field: 'subscriptionId', render: this.displayCancelButton },
                                { title: 'Refund', field: 'subscriptionId', render: this.displayRefundButton },


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
                        <Typography >My Sub Details</Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>

                        <div style={{ textAlign: 'left' }}>
                            <div><b>Service Name:</b> {this.state.selectedSubDetail.subscriptionName}</div>
                            <div><b>Service Desc:</b> {this.state.selectedSubDetail.subscriptionDesc}</div>
                            <div><b>Assigned VIN:</b> {this.state.selectedSubDetail.vin}</div>
                            <div><b>Change VIN:</b><Select
                                label="Select VIN"
                                id="selectVIN"
                                value={this.state.selectedVIN}
                                onChange={this.handleChangeForVINSelect}
                                style={{ fontSize: '14px',width:'400px' }}
                            >

                                <MenuItem
                                    key={-1}
                                    value={-1}
                                    
                                    style={{ background: '#1976d2', color: 'white' }}
                                >
                                    Remove Attached VIN
                                </MenuItem>

                                {this.populateDropDownValue()}
                           
                                
                            </Select>
                                <Button variant="contained" color="primary"
                                    onClick={this.updateVINForSubscription}>
                                    Change VIN </Button>
                            </div>
                        </div>


                    </ExpansionPanelDetails>
                </ExpansionPanel>


            </div>
        );
    }

}
