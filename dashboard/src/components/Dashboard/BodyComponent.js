import React, { Component } from 'react';
import DeviceName from './DeviceName';
import BarChartItem from './BarChartItem.js';
import Load from '../Load';
import IotAPI from '../../api';
import _ from 'lodash';

import { Doughnut, HorizontalBar } from 'react-chartjs-2';

import { Card, Grid } from 'semantic-ui-react'

const CardExampleGroupProps = () => <Card.Group items={items} />

export default class BodyComponent extends Component {
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
                                <React.Fragment>
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
                                </React.Fragment>
                            );
                        }
                    }}
                </Load>
            </div>
        )
    }
}