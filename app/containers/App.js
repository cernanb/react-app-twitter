import React, {Component} from 'react';
import {Router} from 'react-router';

class App extends Component {
  
  get content() {
    return (
      <Router routes={this.props.routes}
                   history={this.props.history} />
    )
  }

  render() {
    return (
      <div style={{ height: '100%'}}>
        {this.content}
      </div>
    )
  }
}

export default App;