import React, { Component } from 'react';
import DeviceInfo from './DeviceInfo';
import BarChartItem from './BarChartItem.js';
import Load from '../Load';
import IotAPI from '../../api';
import _ from 'lodash';

import { Doughnut, HorizontalBar } from 'react-chartjs-2';

import { Card, Grid } from 'semantic-ui-react'



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
                            let types = _.groupBy(result, (entry) => entry.value);
                            let counts = _.map(types, (value) => value.length);
                            let labels = Object.keys(types);

                            const data = {
                                labels: labels,

                                datasets: [{
                                    data: counts,
                                    backgroundColor: counts.map((value, index) => `hsl(${index / counts.length * 360},  100%, 50%)`)
                                }]
                            };

                            return (
                                <Grid columns={2} padded>
                                    <Grid.Row stretched>
                                        <Grid.Column width={8}>
                                            <div className="card-wrap">
                                                <DeviceInfo name={this.props.name} id={this.props.id} status={this.state.status}/>
                                            </div>
                                            <div className="card-wrap">
                                                <HorizontalBar data={data} />
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <div className="card-wrap">
                                                <Doughnut data={data} />
                                            </div>
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