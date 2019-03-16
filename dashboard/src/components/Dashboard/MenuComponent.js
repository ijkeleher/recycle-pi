import React, { Component } from 'react';
import {Form, Field} from 'simple-react-form';
import {Button, Menu, Input, Modal, Dropdown} from 'semantic-ui-react';
import IotApi from '../../api';
import './assets/css/menu.css';
import logo from '../../images/logo.svg';
import Load from '../Load/index';
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
                return(<div>Loading...</div>)
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
            <div className="sub-menu"><a href="#">Leader board</a></div>
              <Modal trigger={<Button style={{backgroundColor: "#33d9b2", color: "#fff"}}>New goal</Button>}>
                <Modal.Header>Create a new goal</Modal.Header>
                <Modal.Content>
                  <Form
                    state={this.state.goalForm}
                    onChange={state => this.setState({goalForm: state})}>
                    <div className = "field">
                      <Field fieldName="name" label="Goal name" type={Input} />
                    </div>
                    <div className = "field">
                      <Field
                        fieldName="metric"
                        label="Goal metric"
                        type={Input}
                      />
                    </div>
                    <div className = "field">
                      <Field
                        fieldName="target"
                        label="Goal target"
                        type={Input}
                      />
                    </div>
                    <Button onChange={this.submitGoal}>Submit</Button>
                  </Form>
                </Modal.Content>
              </Modal>
            </Menu.Item>
          </Menu>
        );
    }
}