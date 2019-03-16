import React, {Component} from 'react';

export default class Load {
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
    let func = React.Children.only(this.props.children);
    return func(this.state);
  }
}
