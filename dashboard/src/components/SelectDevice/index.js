import React, { Component } from 'react';
import './assets/css/selectDevice.css';
import IotAPI from "../../api";
import Load from "../Load/index";
export default class SelectDevice extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    }

    render() {
        if(this.state.id) {
            return (
                <div />
            )
        } else {
            return(
                <Load promise={new IotAPI(this.props.token).getDevices()}>
                {({loading, result})=> {
                    if(loading){
                        return(<div>Loading</div>)
                    } else{
                        return(<div className = "select-panel">
                        <h2>SELECT DEVICE</h2>
                        <div className="device-list">
                            {result.map((device) => {
                                return (
                                    <div className = "device" value={device.id}>
                                        {device.name}
                                    </div>
                                )
                                
                            }) }
                        </div>
                    </div>)
                    }
                }}
                </Load>
           
            )
        }
    }
}