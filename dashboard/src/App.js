import React, {Component} from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SelectDevice from './components/SelectDevice';

import 'semantic-ui-css/semantic.min.css';
class App extends Component {
  render() {
    return (
      <div className="App">

        {/* <Login>  */}
          {/* <SelectDevice> */}
              <Dashboard/>
          {/* </SelectDevice> */}
        {/* </Login> */}
      
      </div>
    );
  }
}

export default App;
