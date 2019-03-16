import React, { Component } from 'react';
import DeviceName from './DeviceName';
import BarChartItem from './BarChartItem.js';
export default class BodyComponent extends Component { 
    render () {
        return(
            <div className = "main-dashboard">
                <DeviceName />
                <BarChartItem />
            </div>
        )
    }
}