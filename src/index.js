import React, {Component} from 'react';
import Script from 'react-load-script'
import NimiqMain from './NimiqMain.js'

class ReactNimiq extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nimiqLoaded: false,
      robohashJSLoaded: false,
      robohashSVGLoaded: false,
    };
  }

  handleNimiqLoaded = () => {
    this.setState({ nimiqLoaded: true })
  }
  handleRobohashJSLoaded = () => {
    this.setState({ robohashJSLoaded: true })
  }

  handleError = (e) => {
    this.setState({ nimiqError: e })
  }

  render () {
    const { nimiqLoaded, robohashJSLoaded } = this.state
    return (
      <div>
        {nimiqLoaded && robohashJSLoaded ?
          <NimiqMain {...this.props}/> :
          <div>
            {/*In the absence of NPM packages, we must make do.*/}
            <Script
              url="https://cdn.nimiq.com/core/nimiq.js"
              onLoad={this.handleNimiqLoaded}
              onError={(e) => this.handleError(e)}
            />
            <Script
              url="https://rawgit.com/sirwoetang/robohash/master/src/js/robohash.js"
              onLoad={this.handleRobohashJSLoaded}
              onError={(e) => this.handleError(e)}
            />
          </div>
        }
      </div>
    );
  }
}

export default ReactNimiq;