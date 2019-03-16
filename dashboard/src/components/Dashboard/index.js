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
        <Menu fluid>
          <Menu.Item position="right">
            <Modal trigger={<Button>New goal</Button>}>
              <Modal.Header>Create a new goal</Modal.Header>
              <Modal.Content>
                <Form
                  state={this.state.goalForm}
                  onChange={state => this.setState({goalForm: state})}>
                  <div>
                    <Field fieldName="name" label="Goal name" type={Input} />
                  </div>
                  <div>
                    <Field
                      fieldName="metric"
                      label="Goal metric"
                      type={Input}
                    />
                  </div>
                  <div>
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
      </div>
    );
  }
}
