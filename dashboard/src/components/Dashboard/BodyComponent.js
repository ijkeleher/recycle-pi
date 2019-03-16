import React, { Component } from 'react';
import DeviceInfo from './DeviceInfo';
import BarChartItem from './BarChartItem.js';
import Load from '../Load';
import IotAPI from '../../api';
import _ from 'lodash';

import { Doughnut } from 'react-chartjs-2';

import { Card } from 'semantic-ui-react'




export default class BodyComponent extends Component {


    render() {
        return (
            <div className="main-dashboard">

                <DeviceInfo name={this.props.name} id={this.props.id}/>

                <Load promise={new IotAPI(this.props.token).getMeasurements()}>
                    {({ result, loading }) => {
                        if (loading) {
                            return <div>Loading</div>
                        }
                        else {
                            let types = _.groupBy(result, (entry) => entry.value);
                            console.log(types);
                            let counts = _.map(types, (value) => value.length);
                            console.log(counts);
                            let labels = Object.keys(types);
                            

                            const data = {
                                labels: labels,
                                
                                datasets: [{
                                    data: counts,
                                    backgroundColor: counts.map((value, index) => `hsl(${index / counts.length * 360},  100%, 50%)`)
                                }]
                            };

                            return (
                                <Doughnut data={data} />
                                
                            );
                        }
                    }}

                </Load>
            </div>
        )
    }
}