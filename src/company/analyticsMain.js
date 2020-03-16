import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { URL } from '../sharedComponents/constants';

export default class AnalyticsMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            chartSelected: 'select',
            report: {},
            highChartOption: {},
            reportURLS: {
                monthlySubcriptions: 'manufacturer/monthlySubscriptionsReport',
                monthlySubcriptionsPerSubscription: 'manufacturer/monthlySubscriptionsPerSubscriptionReport',
                subscriptions: 'manufacturer/subscriptionsReport',
                rdrReport: 'manufacturer/rdrReport',
                select: null
            }
        }
    }

    onChartSelection = event => {
        const chartSelected = event.target.value;
        if (this.state.reportURLS[chartSelected] === null) {
            this.setState(state => {
                let updatedState = {...state};
                updatedState.highChartOption = {};
                updatedState.chartSelected = chartSelected;
                return updatedState;
            });
        } else {
            this.getReport(chartSelected);
        }
    };

    getReport = chartSelected => {
        let url = URL.concat(this.state.reportURLS[chartSelected]);
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
                        if (chartSelected === 'monthlySubcriptions') {
                            this.getMonthlySubscribers(data, chartSelected);
                        } else if (chartSelected === 'monthlySubcriptionsPerSubscription') {
                            this.getMonthlySubscribersBySubscription(data, chartSelected);
                        } else if (chartSelected === 'subscriptions') {
                            this.getSubscriptions(data, chartSelected);
                        } else if (chartSelected === 'rdrReport') {
                            this.getRDRReport(data, chartSelected);
                        }
                    });
                })
            .catch(error => {console.log('Error ', error)});
    }

    getMonthlySubscribers = (data, chartSelected) => {
        this.setState(state => {
            let updatedState = { ...state };
            updatedState.highChartOption = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Number of Monthly Subscriptions'
                },
                xAxis: {
                    categories: data.categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Subscriptions'
                    },
                    allowDecimals: false
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                series: data.data
            };
            updatedState.chartSelected = chartSelected;
            return updatedState;
        });
    }

    getMonthlySubscribersBySubscription = (data, chartSelected) => {
        this.setState(state => {
            let updatedState = { ...state };
            updatedState.highChartOption = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Number of Monthly Subscriptions by Subscription'
                },
                xAxis: {
                    categories: data.categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Subscriptions'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: data.data
            };
            updatedState.chartSelected = chartSelected;
            return updatedState;
        });
    }

    getSubscriptions = (data, chartSelected) => {
        this.setState(state => {
            let updatedState = { ...state };
            updatedState.highChartOption = {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Subscriptions'
                },
                xAxis: {
                    categories: data.categories,
                    title: {
                        text: 'Subscription Name'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Subscriptions'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: data.data
            };
            updatedState.chartSelected = chartSelected;
            return updatedState;
        });
    }

    getRDRReport = (data, chartSelected) => {
        this.setState(state => {
            let updatedState = { ...state };
            updatedState.highChartOption = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'RDR Report'
                },
                xAxis: {
                    categories: data.categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Average number of days difference between RDR submitted by Customer and Dealer'
                    },
                    allowDecimals: false
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                series: data.data
            };
            updatedState.chartSelected = chartSelected;
            return updatedState;
        });
    }

    render() {
        return (
            <div>

                <form>
                    <select value={this.state.chartSelected} onChange={this.onChartSelection}>
                        <option value="select">Select</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="monthlySubcriptions">Number of Monthly Subscriptions</option>
                        <option value="monthlySubcriptionsPerSubscription">Number of Monthly Subscriptions by Subscription</option>
                        <option value="rdrReport">RDR Report</option>
                    </select>
                </form>

                {Object.keys(this.state.highChartOption).length !== 0 &&
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={this.state.highChartOption}
                    />}

            </div>);
    }
}