import React, { Component } from 'react';
import DeviceName from './DeviceName';
import BarChartItem from './BarChartItem.js';
import Load from '../Load';
import IotAPI from '../../api';
import _ from 'lodash';

import { Doughnut } from 'react-chartjs-2';

import { Card } from 'semantic-ui-react'

const items = [
    {
        header: 'Project Report - April',
        description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        meta: 'ROI: 30%',
    },
    {
        header: 'Project Report - May',
        description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
        meta: 'ROI: 34%',
    },
    {
        header: 'Project Report - June',
        description:
            'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
        meta: 'ROI: 27%',
    },
]

const CardExampleGroupProps = () => <Card.Group items={items} />



export default class BodyComponent extends Component {


    render() {
        return (
            <div className="main-dashboard">

                <CardExampleGroupProps />

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