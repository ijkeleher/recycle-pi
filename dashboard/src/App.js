import React, {Component} from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import 'semantic-ui-css/semantic.min.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  }
}

export default App;
