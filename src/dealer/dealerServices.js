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

import TextField from '@material-ui/core/TextField';

export default class DealerServices extends React.Component {

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
            customerComplaintsForService: '',
            detailButtonclicked:'NA'


        }
    }

    componentDidMount() {
        this.getAllCustomerServices();
    }

    onChangeCustomerComplaints = (event)=> {
        this.setState({ customerComplaintsForService:event.target.value});
    }

    getAllCustomerServices = () => {

        //Wrong URL Needs to change
        //let dealerId = localStorage.getItem('dealerId');
        //dealerId = 1;
        let dealerId = localStorage.getItem('dealerId');
        dealerId = 1;
        //http://localhost:7081/owner-site/manufacturer/getAllServices
       // let url = URL + 'dealer/searchAllCustomers/' + dealerId;
        let url = URL + 'customer/viewDealerServices?dealerId=' + dealerId +
            '&subscriptionId=-1';

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

    displayStartService = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({ expanded: 'panel2', selectedServiceDetail: param, detailButtonclicked:'startService' })
                }}>
                Start Service
                            </Button>);

    }

 

    
    
    displayUpdateService = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({ expanded: 'panel2', selectedServiceDetail: param, detailButtonclicked: 'serviceHistory' })
                }}>
                Track/Update Service
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
                        <Typography>Dealer Services -- Integration Pending </Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>

                        <MaterialTable
                            style={{ width: '100%' }}
                            title="Services"
                            columns={[
                                { title: 'Service Name', field: 'servicename' },
                                { title: 'Service Desc', field: 'servicedec' },
                                { title: 'Status', field: 'subscriptionId', render: this.displayStatus },
                                { title: 'Start Service', field: 'subscriptionId', render: this.displayStartService },
                                { title: 'Update Service', field: 'subscriptionId', render: this.displayUpdateService },
                               

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
                           
                            {this.state.detailButtonclicked === 'startService' ?
                                <div style={{ borderStyle: 'solid', borderWidth: '0.5px' }}>
                                    <h3>Start Service</h3>
                                    <div><b>Service Name:</b> {this.state.selectedServiceDetail.servicename}</div>
                                    <div><b>Service Desc:</b> {this.state.selectedServiceDetail.servicedec}</div>
                            <div><b>Dealer Name:</b>
                                
                            </div>
                                    <div><b>Service Station Name:</b></div>
                                    <div><b>Customer Name:</b></div>
                                    
                                    <div>
                                        <b>Customer Service Complaints:</b>
                            <TextField
                             
                                    id="standard-error-helper-text"
                                   
                                    onChange={this.onChangeCustomerComplaints}
                                    value={this.state.customerComplaintsForService}
                                            multiline
                                            disabled
                                    rows="6"
                                            style={{ width: '500px' }}
                                            variant="filled"
                                          
                            />
                            </div>
                            &nbsp;
                                    <div>
                                <Button variant="contained"  color="primary"
                                    >
                                    Start Service
                            </Button>
                                </div>
                            </div> : <div></div>}
                            
                            {this.state.detailButtonclicked === 'serviceHistory' ?
                                <div style={{ borderStyle: 'solid', borderWidth: '0.5px' }}>
                                    <h3>Service Report</h3>
                                  
                                    <div><b>Service Name:</b> {this.state.selectedServiceDetail.servicename}</div>
                                    <div><b>Service Desc:</b> {this.state.selectedServiceDetail.servicedec}</div>
                                    <div><b>Dealer Name:</b> {this.state.selectedServiceDetail.servicename}</div>
                                    <div><b>Service Station Name:</b> {this.state.selectedServiceDetail.servicedec}</div>
                                    <div><b>Customer Name:</b></div>
                                    <div><b>Service Start Date:</b> </div>
                                    <div><b>Service Completed Date:</b> </div>
                                
                                    <div>
                                        <b>Customer Service Complaints:</b>
                                        <TextField

                                            id="standard-error-helper-text"
                                            variant="filled"
                                            disabled 
                                            value={this.state.selectedServiceDetail.customerComplaintsForService}
                                            multiline
                                            
                                            rows="6"
                                            style={{ width: '500px' }}
                                            
                                        />
                                    </div>
                                    <br></br>
                                    <div>
                                        <span><b>Customer Service Analysis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b></span>
                                        <TextField

                                            id="standard-error-helper-text"
                                          
                                            
                                            value={this.state.selectedServiceDetail.customerComplaintsForService}
                                            multiline
                                            rows="6"
                                            style={{ width: '500px' }}

                                        />
                                    </div>
                                    <br></br>
                                    <div>
                                        <b>Service Repairs Done&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>
                                        <TextField

                                            id="standard-error-helper-text"
                                          
                                           
                                            value={this.state.selectedServiceDetail.customerComplaintsForService}
                                            multiline
                                            rows="6"
                                            style={{ width: '500px' }}

                                        />
                                    </div>
                                    <br></br>
                                    <div><b>Total Service Cost:</b>
                                        <TextField

                                            id="standard-error-helper-text"


                                            value={this.state.selectedServiceDetail.customerComplaintsForService}
                                           
                                            style={{ width: '100px' }}

                                        /></div>
                                    <br></br>
                                    <div>
                                        <Button variant="contained" color="primary"
                                        >
                                            Update Service
                                         </Button>
                                        
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        
                                        <Button variant="contained" color="primary"
                                        >
                                            Complete Service
                                         </Button>
                                    </div>
                                </div> :
                                <div></div>
                            }
                        </div>


                    </ExpansionPanelDetails>
                </ExpansionPanel>


            </div>
        );
    }

}
