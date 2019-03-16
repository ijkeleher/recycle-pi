import React, { Component } from 'react';
import DeviceInfo from './DeviceInfo';
import BarChartItem from './BarChartItem.js';
import Load from '../Load';
import IotAPI from '../../api';
import _ from 'lodash';


import { Doughnut, HorizontalBar, Line } from 'react-chartjs-2';

import { Grid } from 'semantic-ui-react'

var moment = require('moment');
moment().format();

export default class BodyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Active"
        }
    }


    render() {
        return (
            <div className="main-dashboard">

                <Load promise={new IotAPI(this.props.token).getMeasurements()}>
                    {({ result, loading }) => {
                        if (loading) {
                            return <div>Loading</div>
                        }
                        else {
                            let deviceSpecific = result.filter((entry) => entry.device === this.props.id);

                            // For the charts
                            let types = _.groupBy(deviceSpecific, (entry) => entry.value);
                            let counts = _.map(types, (value) => value.length);
                            let labels = Object.keys(types);

                       
                            // For the time series
                            let time = _.groupBy(deviceSpecific, (entry) => entry.time)
                            let timeLabels = Object.keys(time);
                            let parsedDates = timeLabels.map(date => new Date(date))

                            var groups = _.groupBy(parsedDates, function (date) {
                                return moment(date).startOf('hour').format();
                            });


                            let groupMapped = _.map(groups, (value, keys) => ({
                                t: new Date(keys),
                                y: value.length
                            }))

                            const dataChart = {
                                labels: labels,

                                datasets: [{
                                    data: counts,
                                    backgroundColor: counts.map((value, index) => `hsl(${index / counts.length * 360},  100%, 50%)`)
                                }]
                            };


                            console.log(groupMapped)



                            return (

                                <Grid columns={2} padded>
                                    <Grid.Row stretched>
                                        <Grid.Column width={8}>
                                            <div className="card-wrap">
                                                <DeviceInfo name={this.props.name} id={this.props.id} status={this.state.status} />
                                            </div>
                                            <div className="card-wrap">
                                                <HorizontalBar data={dataChart} />
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <div className="card-wrap">
                                                <Doughnut data={dataChart} />
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Line
                                        type = 'line'
                                        data={groupMapped}
                                        options={{
                                            scales: {
                                                xAxes: [{
                                                    type: 'time',
                                                    time: {
                                                        unit: 'hour'
                                                    }
                                                }]
                                            }
                                        }}
                                    />
                                </Grid>

                            );
                        }
                    }}
                </Load>
            </div>
        )
    }
}