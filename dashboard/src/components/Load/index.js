import React, {Component} from 'react';
import loading from '../../images/loading.svg';

export default class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.props.promise.then(result => {
      this.setState({result, loading: false});
    });
  }
  render() {
    return this.props.children(this.state);
  }
}

export class Loading extends Component {
  render() {
    return(
      <div className="loader">
        <img src={loading}/>
      </div>
    )
  }
}