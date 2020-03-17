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
import moment from 'moment';

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
            customerComplaintsForService: '',
            detailButtonclicked:'NA',
            dealerListData: [],
            serviceStationListData: [],
            selectDealerId: '-1',
            selectedServiceStationId: '-1'


        }
    }

    componentDidMount() {
        this.getAllMyServices();
        this.getAllDealers();
        this.getAllServiceSattions();
    }

    onChangeCustomerComplaints = (event)=> {
        this.setState({ customerComplaintsForService:event.target.value});
    }

    requestService = () => {


       // let enquiry_created_date = moment().format('DD/MM/YYYY');;

        let complaints = this.state.customerComplaintsForService;

        let customerId = localStorage.getItem('customerId');
        let dealerId = this.state.selectDealerId;
        let serviceId = this.state.selectedServiceDetail.serviceId;

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }

        };

        let url = URL + 'customer/requestService?customerId=' + customerId +
            '&serviceId=' + serviceId + '&vin=-1'+
            '&dealerId=' + dealerId + '&complaints=' + complaints;

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
                        //this.getAllMyServices();
                        this.handleChange('panel1');
                       
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

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

    getAllDealers = () => {
       // let customerId = localStorage.getItem('customerId');

        //http://localhost:7081/owner-site/manufacturer/getAllServices
        let url = URL + 'dealer/getAllDealers';

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
                        //this.setState({ dealerListData: [] });
                        return;
                    }
                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.setState({ dealerListData: data });
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

    }

    getAllServiceSattions = () => {
        // let customerId = localStorage.getItem('customerId');
 
         //http://localhost:7081/owner-site/manufacturer/getAllServices
         let url = URL + 'servicestation/getAllServiceStations';
 
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
                        // this.setState({ serviceStationListData: [] });
                         return;
                     }
                     response.json().then(data => {
                         console.log('fetched data', data);
                         this.setState({ serviceStationListData: data });
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

    populateDealerDropDownValue = () => {
        return this.state.dealerListData.map((dt, i) => {
            return (
                <MenuItem
                    key={i}
                    value={dt.dealerId}
                    style={{ background: '#1976d2', color: 'white' }}
                >
                    {dt.firstname} - {dt.lastname}
                </MenuItem>
            );
        });
    }

    populateServiceSattionDropDownValue = () => {
        return this.state.serviceStationListData.map((dt, i) => {
            return (
                <MenuItem
                    key={i}
                    value={dt.serviceStationId}
                    style={{ background: '#1976d2', color: 'white' }}
                >
                    {dt.firstname} - {dt.lastname}
                </MenuItem>
            );
        });
    }

    handleChangeForVINSelect = event => {
        let selectedVIN = event.target.value;
        
        this.setState({ selectedVIN: selectedVIN });
        
    };

    handleChangeForDealerSelect = event => {
        let selectDealerId = event.target.value;
        
        this.setState({ selectDealerId: selectDealerId });
        
    };

    handleChangeForServiceSattionSelect = event => {
        let selectedServiceStationId = event.target.value;
        
        this.setState({ selectedServiceStationId: selectedServiceStationId });
        
    };

    displayDetailButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    this.setState({ expanded: 'panel2', selectedServiceDetail: param, detailButtonclicked:'requestService' })
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
                    this.setState({ expanded: 'panel2', selectedServiceDetail: param, detailButtonclicked: 'serviceHistory' })
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
                           
                            {this.state.detailButtonclicked === 'requestService' ?
                                <div style={{ borderStyle: 'solid', borderWidth: '0.5px' }}>
                                    <h3>Request Service</h3>
                                    <div><b>Service Name:</b> {this.state.selectedServiceDetail.servicename}</div>
                                    <div><b>Service Desc:</b> {this.state.selectedServiceDetail.servicedec}</div>
                            <div><b>Select Dealer:</b>
                                <Select
                                    label="Select Dealer"
                                    id="selectDealer"
                                    value={this.state.selectDealerId}
                                    onChange={this.handleChangeForDealerSelect}
                                    style={{ fontSize: '14px', width: '400px' }}
                                >

                                    {this.populateDealerDropDownValue()}


                                </Select>
                            </div>
                            <div><b>Select Service Station:</b>
                                <Select
                                    label="Select Service Station"
                                    id="selectServiceStation"
                                    value={this.state.selectedServiceStationId}
                                    onChange={this.handleChangeForServiceSattionSelect}
                                    style={{ fontSize: '14px', width: '400px' }}
                                >

                                    {this.populateServiceSattionDropDownValue()}


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
                                        <Button variant="contained" color="primary"
                                            onClick={this.requestService}
                                    >
                                    Initate Service
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
                                        <b>Service Repairs Done&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>
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
                                    <div><b>Total Service Cost:</b> </div>
                            
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
