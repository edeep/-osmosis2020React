import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
import { custSubscriptions} from '../staticStore/storeData';
import Button from '@material-ui/core/Button';

export default class MySubscriptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            expanded: 'panel1',
            setExpanded: false,
            subscriptionData: custSubscriptions,


        }
    }

    handleChange = panel => (event, isExpanded) => {

        let value = isExpanded ? panel : false;
        this.setState({ expanded: value });
    };

    displayDetailButton = (param) => {
        console.log(param);
        return (
            <Button variant="contained" data-sub={param} color="primary"
                onClick={() => {
                    console.log('onClick id is ', param.subscriptionId);
                    //this.setState({ expanded: 'panel2', selectedSubDetail: param })
                }}>
                Detail
                            </Button>);

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
                    console.log('onClick id is ', param.subscriptionId);
                    //this.setState({ expanded: 'panel2', selectedSubDetail: param })
                }}>
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
                                { title: 'Subscription Desc', field: 'subscriptionDesc' },
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
                    <ExpansionPanelDetails style={{ display: 'flex' }}>




                    </ExpansionPanelDetails>
                </ExpansionPanel>


            </div>
        );
    }

}
