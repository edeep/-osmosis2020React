import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { custmoerVehicles } from '../staticStore/storeData';
import { URL } from '../sharedComponents/constants';

export default class MyVehicles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            expanded: 'panel1',
            setExpanded: false,
            vinSearchValue: '',
            vinSearchError: false,
            vinhelperText: '',
            vinResultData: {},
            showVinConfirmArea: false,
            phoneConfirmValue: '',
            phoneConfirmError: false,
            phoneConfirmText: '',
            emailConfirmValue: '',
            emailConfirmError: false,
            emailConfirmhelperText: '',
            customervehiclesData: []
           
           
        }
    }

    componentDidMount() {
        this.getMyVehicles();
    }

    handleChange = panel => (event, isExpanded) => {

        let value = isExpanded ? panel : false;
        this.setState({ expanded: value });
    };

    onChangeVINSearchField = (event) => {
        this.setState({ vinSearchValue: event.target.value})
        
    }
    onChangePhoneConfirmField = (event) => {
        this.setState({ phoneConfirmValue: event.target.value })

    }
    onChangeEmailConfirmField = (event) => {
        this.setState({ emailConfirmValue: event.target.value })

    }

    
        
    getMyVehicles = () => {

            let customerId = localStorage.getItem('customerId');
            //http://localhost:7081/owner-site/customer/getMyVehicles?customerId=1

            let url = URL + 'customer/getMyVehicles?customerId='+customerId;

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
                            this.setState({ customervehiclesData: data });
                        });
                    })
                .catch(
                    error => {
                        console.log('Error ', error);
                    });

        }
    

    onVINSearch = (event) => {

        // REST API Code to search VIN here
        // 4JGBB86E68A479042
        /*2HGFB2F8XFH591259 
| 2GCEC19V741135916 |
| 1GC1CXC87DF166664 |
| JH4CU2F45DC011988 |
| 4JGBB86E68A479042 |
| 2HGFB2F8XFH591260 |
| 2GCEC19V741135917 |
| 1GC1CXC87DF166665 */
        
        let url = URL + 'customer/searchVIN?vin=' + this.state.vinSearchValue;

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
                        this.setState({ vinSearchError: true, vinhelperText: 'VIN not found', showVinConfirmArea: false });
                        return;
                    }

                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.setState({ vinResultData: data, vinSearchError: false, showVinConfirmArea: true});
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

      
    }

    onVINConfirm = (event) => {

        let data = this.state.vinResultData;
        let customerId = localStorage.getItem('customerId');
        data.customerId = customerId;

        // REST API Code to search VIN here
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };


        let url = URL + 'customer/addVinForCustomer';

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
                        this.setState({ vinSearchError: true, vinhelperText: 'VIN not added', showVinConfirmArea: true });
                        return;
                    }

                    response.json().then(data => {
                        console.log('fetched data', data);
                        this.getMyVehicles();
                        this.handleChange('panel2');
                        this.setState({ vinSearchError: false, showVinConfirmArea: true, vinhelperText: 'VIN sucessfully added'   });
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

      
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
                        <Typography>Add Vehicles </Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{display:'block'}}>

                        <form  noValidate autoComplete="off">
                            <div>
                             
                                <TextField
                                    error={this.state.vinSearchError}
                                    id="standard-error-helper-text"
                                    label="VIN"
                                    onChange={this.onChangeVINSearchField}
                                    value={this.state.vinSearchValue}
                                    helperText={this.state.vinhelperText}
                                />

                                <Button variant="contained"  color="primary"
                                    onClick={this.onVINSearch}>
                                   Search VIN
                            </Button>
                            </div>
                        </form>
                        
                     
                     
                        {this.state.showVinConfirmArea ?
                            <form noValidate autoComplete="off">
                                <div>
                                    OTP has been sent to registered phone and mobile
                                </div>
                                <div>

                                    <TextField
                                        error={this.state.phoneConfirmError}
                                        id="standard-error-helper-text"
                                        label="OTP - Registered Phone"
                                        onChange={this.onChangePhoneConfirmField}
                                        value={this.state.phoneConfirmValue}
                                        helperText={this.state.phoneConfirmText}
                                    />

                                    
                                </div>

                                <div>

                                    <TextField
                                        error={this.state.emailConfirmhelperText}
                                        id="standard-error-helper-text"
                                        label="OTP - Registered Email"
                                        onChange={this.onChangeEmailConfirmField}
                                        value={this.state.emailConfirmValue}
                                        helperText={this.state.emailConfirmhelperText}
                                    />


                                </div>
                                <br></br>
                                <div>

                                <Button variant="contained" color="primary"
                                    onClick={this.onVINConfirm}>
                                    Confirm Phone/Email
                            </Button>
                                </div>
                            </form>
                            
                        :''}
                        
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expanded === 'panel2'}
                    onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography >My Vehicles</Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: 'flex' }}>
                        
                        <MaterialTable
                            style={{ width: '100%' }}
                            title="My Vehicles"
                            columns={[
                                { title: 'Maker', field: 'make' },
                                { title: 'Model', field: 'model' },
                                { title: 'Year', field: 'year'},
                                { title: 'VIN', field: 'vin' },
                                { title: 'Registered No', field: 'registationNo'}


                            ]}
                            data={this.state.customervehiclesData}

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


            </div>
        );
    }

}
