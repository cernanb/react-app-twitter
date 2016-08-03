import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import App from './containers/App';
import {hashHistory, Router} from 'react-router'
import routes from './views/routes'

// const routes = makeRoutes()

// class HomeRoute extends Relay.Route {
//   static routeName = 'Home';
//   static queries = {
//     store: (Component) => Relay.QL`
//       query MainQuery {
//         store { ${Component.getFragment('store')} }
//       }
//     `
//   }
// }

ReactDOM.render(
  <App 
    history={hashHistory}
    routes={routes} 
  />, 
  document.getElementById('root'));
