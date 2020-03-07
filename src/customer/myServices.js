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
import TextField from '@material-ui/core/TextField';

export default class MyServices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            expanded: 'panel1',
            setExpanded: false,
            servicesDataForCustomer: [],
            selectedServiceDetail: {},
            customervehiclesData: [],
            selectedVIN: '-1',
            customerComplaintsForService:''


        }
    }

    componentDidMount() {
        this.getAllMyServices();
    }

    onChangeCustomerComplaints = (event)=> {
        this.setState({ customerComplaintsForService:event.target.value});
    }

    getAllMyServices = () => {
        let customerId = localStorage.getItem('customerId');

        //http://localhost:7081/owner-site/manufacturer/getAllServices
        let url = URL + 'customer/viewCustomerServices?customerId=' + customerId +
        '&subscriptionId=-1' ;

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
                        this.setState({ servicesDataForCustomer: [] });
                        return;
                    }
                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.setState({ servicesDataForCustomer: data });
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
                    this.setState({ expanded: 'panel2', selectedServiceDetail: param })
                }}>
                Request Service
                            </Button>);

    }

 

    
    
    displayTransferButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({ expanded: 'panel2', selectedServiceDetail: param })
                }}>
                View History
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
                        <Typography>My Services </Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>

                        <MaterialTable
                            style={{ width: '100%' }}
                            title="My Services"
                            columns={[
                                { title: 'Service Name', field: 'servicename' },
                                { title: 'Service Desc', field: 'servicedec' },
                                { title: 'Status', field: 'subscriptionId', render: this.displayStatus },
                                { title: 'Request Service', field: 'subscriptionId', render: this.displayDetailButton },
                                { title: 'History', field: 'subscriptionId', render: this.displayTransferButton },
                               

                            ]}
                            data={this.state.servicesDataForCustomer}

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
                        <Typography >Service Details</Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>

                        <div style={{ textAlign: 'left' }}>
                            <div><b>Service Name:</b> {this.state.selectedServiceDetail.servicename}</div>
                            <div><b>Service Desc:</b> {this.state.selectedServiceDetail.servicedec}</div>
                            <div><b>Select Dealer:</b>
                                <Select
                                    label="Select Dealer"
                                    id="selectVIN"
                                    value={this.state.selectedVIN}
                                    onChange={this.handleChangeForVINSelect}
                                    style={{ fontSize: '14px', width: '400px' }}
                                >

                                    {this.populateDropDownValue()}


                                </Select>
                            </div>
                            <div><b>Select Service Station:</b>
                                <Select
                                    label="Select Service Station"
                                    id="selectVIN"
                                    value={this.state.selectedVIN}
                                    onChange={this.handleChangeForVINSelect}
                                    style={{ fontSize: '14px', width: '400px' }}
                                >

                                    {this.populateDropDownValue()}


                                </Select>
                            </div>
                            <div>
                            <TextField
                             
                                    id="standard-error-helper-text"
                                    label="Enter all your requests for the chosen service"
                                    onChange={this.onChangeCustomerComplaints}
                                    value={this.state.customerComplaintsForService}
                                    multiline
                                    rows="6"
                                    style={{ width: '500px' }}
                            />
                            </div>
                            &nbsp;
                            <div>
                                <Button variant="contained"  color="primary"
                                    >
                                    Initate Service
                            </Button>
                            </div>
                        </div>


                    </ExpansionPanelDetails>
                </ExpansionPanel>


            </div>
        );
    }

}
