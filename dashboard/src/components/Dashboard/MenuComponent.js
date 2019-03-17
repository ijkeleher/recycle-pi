import React, { Component } from 'react';
import {Form, Field} from 'simple-react-form';
import {Button, Menu, Input, Modal, Dropdown} from 'semantic-ui-react';
import IotApi from '../../api';
import './assets/css/menu.css';
import logo from '../../images/logo.svg';
import Load, { Loading } from '../Load/index';
export class MenuComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          goalForm: {},
          deviceForm: {},
          deviceList: []
        };
      }

      submitGoal = () => {
        new IotApi(this.props.token).submitGoal(this.state.goalForm);
      };
    
      registerDevice = () => {
        new IotApi(this.props.token).registerDevice(this.state.deviceForm);
      };

      switchDevice = (event, data) => {
        this.props.selectDevice(data.value,data.text)
      }
    
    render() {

        return(
        <Menu fluid>
            <Menu.Item position="left">
                <h2>RecyclePI <img src={logo} style={{height:20, color: '#218c74'}} /></h2>
            </Menu.Item>
            <Menu.Item position="right" className="fit-item">
            <Load promise={new IotApi(this.props.token).getDevices()}>
            {({loading, result}) => {
              if(loading) {
                return(<div />)
              } else {
                return (
                  <Dropdown
                    placeholder={this.props.name}
                    fluid
                    selection
                    options={
                      result.map(device => ({
                        "key": device.id,
                        "text": device.name,
                        "value": device.id

                      }))
                    }
                    onChange={(event, data) => this.switchDevice(event,data)}
                  />
                )
              }
            }}
          
            </Load>
            <div className="sub-menu">
              {/* <a href="#" onClick={() => this.props.toggleLeaderBoard()}>{(this.props.view) ? "Dashboard" : "Leaderboard"}</a> */}
              <Button onClick={() => this.props.toggleLeaderBoard()} style={{backgroundColor: (this.props.view) ? "#474787" : "#218c74", color: 'white'}}>{(this.props.view) ? "Dashboard" : "Leaderboard"}</Button>
            </div>
             
            </Menu.Item>
          </Menu>
        );
    }
}