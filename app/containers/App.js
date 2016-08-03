import React, {Component} from 'react';
import {Router} from 'react-router';
import Relay from 'react-relay';
import makeRoutes from '../views/routes'
import ReactRouterRelay from 'react-router-relay';
import {hashHistory} from 'react-router'

// const routes = makeRoutes()

class App extends Component {
  
  get content() {
    return (
      <Router routes={this.props.routes}
              history={hashHistory} 
              render={this.props.render}
              createElement={ReactRouterRelay.createElement}
              environment={this.props.environment} />
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

// App = Relay.createContainer(App, {
//   fragments: {
//     store: () => Relay.QL`
//       fragment on Store {
//         tweets {
//           _id
//         }
//       }
//     `
//   }
// })

export default App;