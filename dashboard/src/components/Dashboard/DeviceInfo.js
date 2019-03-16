import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

export default class DeviceInfo extends Component { 
    render () {
        return(
            <Card> 
                <div className="content">
                    <strong>Device id:</strong> <code style={{color: "#ff793f"}}>{this.props.id}</code>
                </div>
            </Card>
        )
    }
}