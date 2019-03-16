import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import IotAPI from "../../api";
import Load, { Loading } from '../Load';
import _ from 'lodash';

export default class Leaderboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deviceList: [],
            measurementList: []
        };

    }
    componentDidMount() {
        let api = new IotAPI(this.props.token);
        var self = this;
        api.getDevices().then(result => self.setState({
            deviceList: result
        }))
        api.getMeasurements().then(result => self.setState({
            measurementList: result
        }))
    }


    render() {
        console.log(this.state);

        return (

            <div className="main-dashboard">


            </div>
        )
    }
}

