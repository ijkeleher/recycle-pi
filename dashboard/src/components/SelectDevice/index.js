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

    selectDevice = (id) => {
        this.setState({
            id: id
        })
    }
    

    render() {
        if(this.state.id) {
            return (
                React.cloneElement(React.Children.only(this.props.children), {
                    token: this.props.token,
                    id: this.state.id,
                    selectDevice: this.selectDevice,
                })
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
                            {result.map((device, key) => {
                                return (
                                    <div className = "device" onClick={() => this.selectDevice(device.id)}>
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