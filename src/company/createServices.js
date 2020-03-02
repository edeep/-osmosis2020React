import React from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { forwardRef } from 'react';

export default class CreateServices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            servicesData: [
                {
                    serviceId:1,
                    serviceName: 'Safety connect',
                    serviceDesc:'Connecting all your safety',
                    servicePrice: '$500',
                },
                {
                    serviceId: 2,
                    serviceName: 'Service connect',
                    serviceDesc: 'Connecting all your services',
                    servicePrice: '$200',
                },
                {
                    serviceId: 3,
                    serviceName: 'Remote connect',
                    serviceDesc: 'Connecting all your remotes',
                    servicePrice: '$100',
                },
                {
                    serviceId: 4,
                    serviceName: 'Navigation connect',
                    serviceDesc: 'Connecting all your navigation',
                    servicePrice: '$400',
                },
                {
                    serviceId: 5,
                    serviceName: 'Destination Assist connect',
                    serviceDesc: 'Connecting all your destinations',
                    servicePrice: '$100',
                }
            ]
        }
    }

    addNewService = (data) => {
        
    }

    updateService = (data) => {

    }

    deleteService = (data) => {

    }

    render() {
        return(
            <div style={{ width: '100%' }}>
             
                <MaterialTable
                    icons={{
                        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
                        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
                        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />)
                        }}
               title="Services List"
                    columns={[
                        { title: 'Service Name', field: 'serviceName' },
                        { title: 'Service Desc', field: 'serviceDesc' },
                        { title: 'Price', field: 'servicePrice' },


                    ]}
                    data={this.state.servicesData}

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
                                 
                                    this.addNewService(newData);
                                    resolve()
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.updateService(newData);
                                    resolve()
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.deleteService(oldData.serviceId);
                                    resolve()
                                }, 1000)
                            })
                    }}
                />
            </div>
        )
    }
}