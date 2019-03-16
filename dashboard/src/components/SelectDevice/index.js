import React, { Component } from 'react';
import {Button, Input, Modal } from 'semantic-ui-react';
import './assets/css/selectDevice.css';
export default class SelectDevice extends Component { 
    render() {
        return(
            <div className = "select-panel">
                <h2>SELECT DEVICE</h2>
                <div className="device-list">
                    <div className = "device" value="aaedd1f1-12f9-499b-9c5c-990147dc019a">
                        Device1
                    </div>
                    <Modal trigger={
                    <div style={{width: "100%", alignItems: 'center'}}>
                        <Button style={{backgroundColor: "#33d9b2", color: "#fff", margin: '10px auto', display: 'flex'}}>New Device</Button>
                    </div>}>
                        <Modal.Header>Add a new item</Modal.Header>
                        <Modal.Content></Modal.Content>
                    </Modal>
                </div>
            </div>
        )
    }
}