import React from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { forwardRef } from 'react';
import {  services} from '../staticStore/storeData';

export default class CreateServices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            servicesData: services
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