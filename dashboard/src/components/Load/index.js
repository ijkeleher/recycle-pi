import React, {Component} from 'react';

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
