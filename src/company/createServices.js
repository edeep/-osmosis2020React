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
            servicesData: []
        }
    }

    addNewService = (data) => {

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = "https://13.231.197.79/owner-site/manufacturer/addNewService";
        fetch(url, options)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()  //we only get here if there is no error
            })
            .then(json => {
                this.getAllServices();
            })
            .catch(err => {
                
                console.log('REST ERROR');
            })
        
    }

    updateService = (data) => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = "https://13.231.197.79/owner-site/manufacturer/updateService";
        fetch(url, options)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()  //we only get here if there is no error
            })
            .then(json => {
                this.getAllServices();
            })
            .catch(err => {

                console.log('REST ERROR');
            })


    }

    deleteService = (data) => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = "https://13.231.197.79/owner-site/manufacturer/deleteService";
        fetch(url, options)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()  //we only get here if there is no error
            })
            .then(json => {
                this.getAllServices();
            })
            .catch(err => {

                console.log('REST ERROR');
            })

    }

    getAllServices = () => {
        let url = "https://13.231.197.79/owner-site/manufacturer/getAllServices";
        fetch(url)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()  //we only get here if there is no error
            })
            .then(json => {
                console.log('Json >>', json);
                this.setState({ servicesData: json});
            })
            .catch(err => {

                console.log('REST ERROR');
            })
    }

    componentDidMount() {
        this.getAllServices();
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
                        { title: 'Service Name', field: 'servicename' },
                        { title: 'Service Desc', field: 'servicedec' }
                      


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
                                    this.deleteService(oldData);
                                    resolve()
                                }, 1000)
                            })
                    }}
                />
            </div>
        )
    }
}