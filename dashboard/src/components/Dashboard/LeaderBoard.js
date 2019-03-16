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
            measurementList: [],
            loading: true
        };

    }
    componentDidMount() {
        let api = new IotAPI(this.props.token);
        var self = this;
        api.getDevices().then(result => self.setState({
            deviceList: result
        }))
        api.getMeasurements().then(result => self.setState({
            measurementList: result,
            loading: false
        }))
    }


    render() {   
        if(this.state.loading) {
            return <Loading />
        } else {
            return (

                <div className="main-dashboard">
    
    
                    <Table striped>
                        <thead>
                            <tr><th>Owner</th>
                                <th>Device</th>
                                <th>Points</th>
                            </tr></thead>
                        <tbody>
                            {this.state.deviceList.map((device,key) => {
                                
                                //device.id
                                let fitleredArray = this.state.measurementList.filter(item => item.device === device.id);
                                let maxPoint = fitleredArray.length;
                                let trashPoint = 0;
                                fitleredArray.map((each) => {
                                    if(each.value === 'waste type') {
                                        trashPoint++;
                                    }
                                })
                                let result = (maxPoint-trashPoint)*100/maxPoint
                                console.log("max: " + maxPoint);
                                console.log("trash: " + trashPoint);
                                console.log(result)

    
                                return (
                                    <tr key={key}><th>{device.owner}</th>
                                        <th>{device.id}</th>
                                        <th>{result}</th></tr>
                                        
                                )

                            })
                            }
    
                        </tbody>
                    </Table>
    
    
                </div >
            )
        }
        
    }
}

