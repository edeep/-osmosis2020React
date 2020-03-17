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

export default class MyEnquiry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            expanded: 'panel1',
            setExpanded: false,
            enQuiryDataForCustomer: [],
            selectedServiceDetail: {},
            customervehiclesData: [],
            selectedVIN: '-1',
            enquiryQuestion: '',
            detailButtonclicked: 'NA',
            dealerListData: [],
            serviceStationListData: [],
            selectDealerId: '-1',
            selectedServiceStationId: '-1'


        }
    }

    componentDidMount() {
        this.getAllMyEnquiry();
        this.getAllDealers();
       
    }

    onChangeEnquiryQuestion = (event) => {
        this.setState({ enquiryQuestion: event.target.value });
    }

    getAllMyEnquiry = () => {
        let customerId = localStorage.getItem('customerId');

        //http://localhost:7081/owner-site/manufacturer/getAllServices
        let url = URL + 'customer/getAllEnquiriesForCustomerId?customerId=' + customerId;

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
                        this.setState({ enQuiryDataForCustomer: [] });
                        return;
                    }
                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.setState({ enQuiryDataForCustomer: data });
                        
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



    sendEnquiry = () => {
      
       
        let enquiry_created_date = moment().format('DD/MM/YYYY');;
       
        let enquiry_question = this.state.enquiryQuestion;
       
        let customerId = localStorage.getItem('customerId');
        let dealerId = this.state.selectDealerId;

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }

        };

        let url = URL + 'customer/addCustomerEnquiry?customerId=' + customerId +
            '&dealerId=' + dealerId + '&enquiry_question=' + enquiry_question
            + '&enquiry_created_date=' + enquiry_created_date
            + '&enquiry_answer=NA&enquiry_resolved_date=NA';

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
                        //this.getAllSubscriptions();
                        this.handleChange('panel1');
                        this.getAllMyEnquiry();
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



    handleChangeForDealerSelect = event => {
        let selectDealerId = event.target.value;
        
        this.setState({ selectDealerId: selectDealerId });
        
    };

    displayEnquirerName =   (param) => {
        return (
            <div>
                {param.dealerId && param.dealerId > 0 ? <div>
                    {param.dealerFirstName + ' ' + param.dealerLastName}
                </div>:'Manufacturer'}
            </div>
        )
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
                        <Typography>My Enquiry/Requests </Typography>
                      

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>
                        <Button variant="contained"  color="primary"
                            onClick={() => {
                               
                                this.setState({ expanded: 'panel2',  detailButtonclicked: 'requestService' })
                            }}>
                           New Enquiry/Requests
                            </Button>
                        <MaterialTable
                            style={{ width: '100%' }}
                            title="My Enquiry/Requests"
                            columns={[
                                { title: 'To', render: this.displayEnquirerName },
                                { title: 'Created Date', field: 'enquiryCreatedDate' },
                                { title: 'Question/Request', field: 'enquiryQuestion' },
                                { title: 'Resolved Date', field: 'enquiryResolvedDate' },
                                { title: 'Answer/Resolution', field: 'enquiryAnswer' },
                             
                            
                                { title: 'History', field: 'enquiryId', render: this.displayTransferButton },
                               

                            ]}
                            data={this.state.enQuiryDataForCustomer}

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
                        <Typography >Enquiry/Requests Details</Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'block' }}>

                        <div style={{ textAlign: 'left' }}>
                           
                            {this.state.detailButtonclicked === 'requestService' ?
                                <div style={{ borderStyle: 'solid', borderWidth: '0.5px' }}>
                                    <h3>Enquire</h3>
                                    <p> Enquiry/Requests are by Default sent to manufacturer. Select Dealer below
                                if you need to contact Dealer</p>        
                            <div><b>Select Dealer:</b>
                                <Select
                                    label="Select Dealer"
                                    id="selectDealer"
                                    value={this.state.selectDealerId}
                                    onChange={this.handleChangeForDealerSelect}
                                    style={{ fontSize: '14px', width: '400px' }}
                                        >
                                            <MenuItem
                                                key={-1}
                                                value={-1}
                                                style={{ background: '#1976d2', color: 'white' }}
                                            >
                                               Select Dealer
                                            </MenuItem>

                                    {this.populateDealerDropDownValue()}


                                </Select>
                            </div>
                           
                            <div>
                            <TextField
                             
                                    id="standard-error-helper-text"
                                    label="Add your Enquiry/Requests"
                                    onChange={this.onChangeEnquiryQuestion}
                                    value={this.state.enquiryQuestion}
                                    multiline
                                    rows="6"
                                    style={{ width: '500px' }}
                            />
                            </div>
                            &nbsp;
                            <div>
                                        <Button variant="contained" color="primary" onClick={this.sendEnquiry}
                                    >
                                    Send Enquiry/Requests
                            </Button>
                                </div>
                            </div> : <div></div>}
                            
                            {this.state.detailButtonclicked === 'serviceHistory' ?
                                <div style={{ borderStyle: 'solid', borderWidth: '0.5px' }}>
                                    <h3>Enquiry/Requests History</h3>
                                  
                                    <div><b>Enquired On:</b> {this.state.selectedServiceDetail.enquiryCreatedDate }</div>
                                  
                                    <div><b>Resolved On:</b> {this.state.selectedServiceDetail.enquiryResolvedDate}</div>
                                    
                                
                                    <div>
                                        <b>Customer Enquiry/Requests Details:</b>
                                        <TextField

                                            id="standard-error-helper-text"
                                            variant="filled"
                                            disabled 
                                            value={this.state.selectedServiceDetail.enquiryQuestion}
                                            multiline
                                            rows="6"
                                            style={{ width: '500px' }}
                                            
                                        />
                                    </div>
                                    <br></br>
                                    <div>
                                        <span><b>Enquiry/Requests Comments&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b></span>
                                        <TextField

                                            id="standard-error-helper-text"
                                            variant="filled"
                                            disabled
                                            value={this.state.selectedServiceDetail.enquiryAnswer}
                                            multiline
                                            rows="6"
                                            style={{ width: '500px' }}

                                        />
                                    </div>
                                    <br></br>
                                   
                            
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
