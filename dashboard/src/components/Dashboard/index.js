import React, {Component} from 'react';

import './assets/css/dashboard.css';


import { MenuComponent } from './MenuComponent';
import BodyComponent from './BodyComponent';
export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.setState({
      isLeaderBoard: false
    })

    viewLeaderBoard = () => {
      this.setState({
        isLeaderBoard: true
      })
    }
  }


  render() {
    return (
      <div style={{width: '100%'}}>
        <MenuComponent name={this.props.name} selectDevice={this.props.selectDevice}/>
        {(!this.state.isLeaderBoard) ? (<BodyComponent name={this.props.name} id={this.props.id} status={this.props.status}/>) : (<LeaderBoard/>)}
        {/* <BodyComponent name={this.props.name} id={this.props.id} status={this.props.status}/> */}
      </div>
    );
  }
}
