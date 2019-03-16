import React, {Component} from 'react';
import {Form, Field} from 'simple-react-form';
import {Button, Menu, Input, Modal, Dropdown} from 'semantic-ui-react';
import IotApi from '../../api';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goalForm: {},
      deviceForm: {},
    };
  }

  submitGoal = () => {
    new IotApi(this.props.token).submitGoal(this.state.goalForm);
  };

  registerDevice = () => {
    new IotApi(this.props.token).registerDevice(this.state.deviceForm);
  };

  render() {
    return (
      <div>
        <Menu>
          <Menu.Item position="right">
            <Modal trigger={<Button>New goal</Button>}>
              <Form
                state={this.state.goalForm}
                onChange={state => this.setState({goalForm: state})}>
                <Field fieldName="name" label="Goal name" type={Input} />
                <Field fieldName="metric" label="Goal metric" type={Input} />
                <Field fieldName="target" label="Goal target" type={Input} />
                <Button onChange={this.submitGoal}>Submit</Button>
              </Form>
            </Modal>
          </Menu.Item>
          <Menu.Item position="right">
            <Form>
              <Field fieldName="device" label="Device" type={Dropdown} />
              <Button onChange={this.submitGoal}>Claim</Button>
            </Form>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
