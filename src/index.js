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

  render () {
    const { nimiqLoaded } = this.state
    return (
      <div>
        {nimiqLoaded ? <NimiqMain/> : <Script
          url="https://cdn.nimiq.com/core/nimiq.js"
          onLoad={this.handleNimiqLoaded}
        />}
      </div>
    );
  }
}

export default ReactNimiq;