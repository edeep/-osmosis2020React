import React from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { forwardRef } from 'react';
import { URL } from '../sharedComponents/constants';

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

        let url = URL + 'manufacturer/addNewService';
        
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
                        this.getAllServices();
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });
        
    }

    updateService = (data) => {
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = URL + 'manufacturer/updateService';
        
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
                        this.getAllServices();
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });


    }

    deleteService = (data) => {
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        let url = URL + "manufacturer/deleteService";

        
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
                        this.getAllServices();
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });
        
    }


    

    getAllServices = () => {

        //http://localhost:7081/owner-site/manufacturer/getAllServices
        let url = URL + 'manufacturer/getAllServices';
      
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
                        this.setState({ servicesData: data });
                    });
                })
            .catch(
                error => {
                    console.log('Error ', error);
                });

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