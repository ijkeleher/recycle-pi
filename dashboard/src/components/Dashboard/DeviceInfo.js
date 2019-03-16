import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

export default class DeviceInfo extends Component { 
    render () {
        return(
            <div className="content">
                <strong>Device id:</strong> <code style={{color: "#ff793f"}}>{this.props.id}</code><br/>
                <strong>Device status:</strong> <span style={{color: this.props.status == 'Active' ? "#33d9b2":"#ff5252", fontWeight: 700}}>{this.props.status}</span>

            </div>
        )
    }
}