import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default class AnalyticsMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    options = {
        title: {
            text: 'Testing chart....'
        },
        series: [{
            data: [1, 2, 3]
        }]
    }

    render() {
        return (
            <div>
             
                 <HighchartsReact
                    highcharts={Highcharts}
                    options={this.options}
                />

            </div>);
    }
}