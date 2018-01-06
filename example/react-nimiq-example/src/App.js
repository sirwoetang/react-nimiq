import React, { Component } from 'react';
import ReactNimiq from 'react-nimiq';

class App extends Component {
  render() {
    return (
      <div>
        <ReactNimiq
          miningAddress={'NQ95 8EKS AHXQ 774N NJ7D 2CNH DXG7 B1QX 1BER'}
          miningAllowed={false}
          clientType={'light'}
          displayWidget={true}
        />
      </div>
    );
  }
}

export default App;
