import React, {Component} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import './assets/css/login.css';
import IotAPI from "../../api";
import logo from './assets/images/logo.svg';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: null
    }

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange (event) {
    console.log(event);
    this.setState({[event.target.name]: event.target.value});
  }

  onLogin = () => {
    IotAPI.logIn(this.state.username, this.state.password).then((res) => {
      this.setState({
        token: res
      })
    });
  }
  render() {
    if(this.state.token) {
      return (this.props.children);
    } else {
      return (
        <div className = "form-login">
           <h1>RecyclePI <img src={logo} style={{height:20, color: '#218c74'}} /></h1>
           <Form>
              <Form.Field>
                <label>Username</label>
                <input placeholder='Username' type="text" value={this.state.value} name="username" onChange={this.onInputChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type='password' value={this.state.value} name="password" onChange={this.onInputChange}/>
              </Form.Field>
              <Form.Field>
                <Checkbox label='Remember me' />
              </Form.Field>
              <Button type='submit' style={{backgroundColor: '#34ace0', color: '#fff'}} onClick={this.onLogin}>Login</Button>
          </Form>
        </div>
      );
    }
  }
}
