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
            showVinConfirmArea: false,
            phoneConfirmValue: '',
            phoneConfirmError: false,
            phoneConfirmText: '',
            emailConfirmValue: '',
            emailConfirmError: false,
            emailConfirmhelperText: '',
            customervehiclesData: custmoerVehicles
           
           
        }
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

    

    onVINSearch = (event) => {

        // REST API Code to search VIN here

        let vin = this.state.vinSearchValue;
        if (vin === '100') {
            this.setState({ vinSearchError: false, showVinConfirmArea: true });

        } else {

            this.setState({ vinSearchError: true, vinhelperText: 'VIN not found', showVinConfirmArea: false });

        }
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
                                    onClick={this.onVINSearch}>
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
                                { title: 'Maker', field: 'maker' },
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
