import React, { Component } from 'react';
import DeviceInfo from './DeviceInfo';
import BarChartItem from './BarChartItem.js';
import Load from '../Load';
import IotAPI from '../../api';
import _ from 'lodash';

import { Doughnut, HorizontalBar } from 'react-chartjs-2';

import { Grid } from 'semantic-ui-react'

export default class BodyComponent extends Component {
    render() {
        return (
            <div className="main-dashboard">

                <DeviceInfo name={this.props.name} id={this.props.id} />

                <Load promise={new IotAPI(this.props.token).getMeasurements()}>
                    {({ result, loading }) => {
                        if (loading) {
                            return <div>Loading</div>
                        }
                        else {
                            let deviceSpecific = result.filter((entry) => entry.device === this.props.id);

                            let types = _.groupBy(deviceSpecific, (entry) => entry.value);
                            let counts = _.map(types, (value) => value.length);
                            let labels = Object.keys(types);

                            console.log(deviceSpecific)

                            let time = _.groupBy(deviceSpecific, (entry) => entry.time)

                            console.log(time)

                            const data = {
                                labels: labels,

                                datasets: [{
                                    data: counts,
                                    backgroundColor: counts.map((value, index) => `hsl(${index / counts.length * 360},  100%, 50%)`)
                                }]
                            };

                            return (
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Doughnut data={data} />
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <HorizontalBar data={data} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            );
                        }
                    }}
                </Load>
            </div>
        )
    }
}