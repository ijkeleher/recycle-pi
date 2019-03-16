import React, { Component } from 'react';
import './assets/css/selectDevice.css';
import IotAPI from "../../api";
export default class SelectDevice extends Component { 
    constructor(props) {
        super(props);
        this.setState({
            devices: []
        })
    }
    componentDidMount() {
        IotAPI.getDevices().then(res => {
            console.log(res);
        })
    }
    render() {
        return(
            <div className = "select-panel">
                <h2>SELECT DEVICE</h2>
                <div className="device-list">
                    <div className = "device" value="aaedd1f1-12f9-499b-9c5c-990147dc019a">
                        Device1
                    </div>
                </div>
            </div>
        )
    }
}