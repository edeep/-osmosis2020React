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
            detailButtonclicked: 'NA',
            serviceRepairsCost:'',
            serviceRepairsDesc: '',
            servicecomplaintAnalysis: ''


        }
    }

    componentDidMount() {
        this.getAllCustomerServices();
    }

    onChangeCustomerComplaints = (event)=> {
        this.setState({ customerComplaintsForService:event.target.value});
    }
    onChangeServiceRepairsCost = (event) => {
        this.setState({ serviceRepairsCost: event.target.value });
    }
    onChangeServiceRepairsDesc = (event) => {
        this.setState({ serviceRepairsDesc: event.target.value });
    }
    onChangeServicecomplaintAnalysis = (event) => {
        this.setState({ servicecomplaintAnalysis: event.target.value });
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
        let showButton = true;
        if(param.serviceStartedDate && param.serviceStartedDate !== 'null') {
            showButton = false;
        }
        return (
            showButton=== true ?
                <div><Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({ expanded: 'panel2', selectedServiceDetail: param, detailButtonclicked:'startService' })
                    }}>Start Service</Button ></div>: ''
                            
                    );

    }

 

    
    
    displayUpdateService = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({
                        expanded: 'panel2', selectedServiceDetail: param,
                        detailButtonclicked: 'serviceHistory',
                        serviceRepairsCost: param.serviceRepairsCost,
                        serviceRepairsDesc: param.serviceRepairsDesc,
                        servicecomplaintAnalysis: param.servicecomplaintAnalysis
                    })
                }}>
                Track Service
                            </Button>);

    }
    
    completeService = () => {


        // let enquiry_created_date = moment().format('DD/MM/YYYY');;

        let analysis = this.state.servicecomplaintAnalysis;

       
        let repairs = this.state.serviceRepairsDesc;
        let serviceId = this.state.selectedServiceDetail.serviceId;
        let cost = this.state.serviceRepairsCost;

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }

        };

        let url = URL + 'customer/completeService?'+
            '&serviceId=' + serviceId +
            '&analysis=' + analysis + '&repairs=' + repairs +
            '&cost=' + cost;

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
                        this.getAllCustomerServices();
                        this.handleChange('panel1');

                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    startService = () => {
        let serviceId = this.state.selectedServiceDetail.serviceId;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }

        };

        let url = URL + 'customer/startService?' +
            '&serviceId=' + serviceId;

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
                        this.getAllCustomerServices();
                        this.handleChange('panel1');

                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    displayStatus = (param) => {
        console.log(param);
        let status = "Requested";
        if (param.serviceCompletedDate && param.serviceCompletedDate!=='null') {
            status = "Completed"
        } else if (param.serviceStartedDate && param.serviceStartedDate !== 'null') {
            status = "In-Progress"
        }
        return (
           <div>
                {status}
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
                        <Typography>Dealer Services </Typography>

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
                           
                                    
                                    <div>
                                        <b>Customer Service Complaints:</b>
                            <TextField
                             
                                    id="standard-error-helper-text"
                                   
                                   
                                            value={this.state.selectedServiceDetail.serviceCustomerComplaints}
                                            multiline
                                            disabled
                                    rows="6"
                                            style={{ width: '500px' }}
                                            variant="filled"
                                          
                            />
                            </div>
                            &nbsp;
                                    <div>
                                        <Button variant="contained" color="primary" onClick={this.startService}
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
                                    <div><b>VIN:</b>{this.state.selectedServiceDetail.vin}</div>
                                    <div><b>Service Requested Date:</b>{this.state.selectedServiceDetail.serviceRequestedDate} </div>
                                    <div><b>Service Start Date:</b> {this.state.selectedServiceDetail.serviceStartedDate}</div>
                                    <div><b>Service Completed Date:</b> {this.state.selectedServiceDetail.serviceCompletedDate}</div>
                                
                                    <div>
                                        <b>Customer Service Complaints:</b>
                                        <TextField

                                            id="standard-error-helper-text"
                                            variant="filled"
                                            disabled 
                                            value={this.state.selectedServiceDetail.serviceCustomerComplaints}
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
                                          
                                            onChange={this.onChangeServicecomplaintAnalysis}
                                            value={this.state.servicecomplaintAnalysis}
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
                                          
                                            onChange={this.onChangeServiceRepairsDesc}
                                            value={this.state.serviceRepairsDesc}
                                            multiline
                                            rows="6"
                                            style={{ width: '500px' }}

                                        />
                                    </div>
                                    <br></br>
                                    <div><b>Total Service Cost:</b>
                                        <TextField

                                            id="standard-error-helper-text"

                                            onChange={this.onChangeServiceRepairsCost}
                                            value={this.state.serviceRepairsCost}
                                           
                                            style={{ width: '100px' }}

                                        /></div>
                                    <br></br>
                                    <div>
                                        
                                        
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                         
                                        {this.state.selectedServiceDetail.serviceCompletedDate && this.state.selectedServiceDetail.serviceCompletedDate !== 'null' ?
                                            <Button variant="contained" color="primary"
                                                onClick={this.completeService}
                                            >
                                                Complete Service
                                         </Button> : ''}
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
