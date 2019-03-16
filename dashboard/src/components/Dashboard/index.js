import React, {Component} from 'react';

import './assets/css/dashboard.css';
import LeaderBoard from './LeaderBoard';

import {MenuComponent} from './MenuComponent';
import BodyComponent from './BodyComponent';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLeaderBoard: false,
    };
  }
  toggleLeaderBoard = () => {
    this.setState(prevState => ({
      isLeaderBoard: !prevState.isLeaderBoard,
    }));
  };

  render() {
    return (
      <div style={{width: '100%'}}>
        <MenuComponent
          name={this.props.name}
          selectDevice={this.props.selectDevice}
          toggleLeaderBoard={this.toggleLeaderBoard}
          view={this.state.isLeaderBoard}
        />
        {!this.state.isLeaderBoard ? (
          <BodyComponent
            name={this.props.name}
            id={this.props.id}
            status={this.props.status}
          />
        ) : (
          <LeaderBoard />
        )}
      </div>
    );
  }
}
