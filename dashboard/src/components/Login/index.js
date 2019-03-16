import React, {Component} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import './assets/css/login.css';
import IotAPI from "../../api";
import logo from './assets/images/logo.svg';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className = "form-login">
         <h1>RecyclePI <img src={logo} style={{height:20, color: '#218c74'}} /></h1>
         <Form>
            <Form.Field>
              <label>Username</label>
              <input placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder='Password' type='password' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Remember me' />
            </Form.Field>
            <Button type='submit' style={{backgroundColor: '#34ace0', color: '#fff'}}>Login</Button>
        </Form>
      </div>
    );
  }
}
