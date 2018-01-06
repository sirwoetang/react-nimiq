import React, {Component} from 'react';
import Script from 'react-load-script'
import NimiqMain from './NimiqMain.js'

class ReactNimiq extends Component {
  constructor (props) {
    super(props);
    this.state = { nimiqLoaded: false };
  }

  handleNimiqLoaded = () => {
    this.setState({ nimiqLoaded: true })
  }

  handleNimiqError = (e) => {
    this.setState({ nimiqError: e, nimiqLoaded: false })
  }

  render () {
    const { nimiqLoaded } = this.state
    return (
      <div>
        {nimiqLoaded ?
          <NimiqMain
            miningAddress={this.props.miningAddress}
            miningAllowed={this.props.miningAllowed}
            clientType={this.props.clientType}
            displayWidget={this.props.displayWidget}
          />
          : <Script
            url="https://cdn.nimiq.com/core/nimiq.js"
            onLoad={this.handleNimiqLoaded}
            onError={(e) => this.handleNimiqError(e)}
          />}
      </div>
    );
  }
}

export default ReactNimiq;