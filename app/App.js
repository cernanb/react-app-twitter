import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {applyRouterMiddleware, hashHistory, Router, Route, IndexRedirect} from 'react-router';
import AuthService from './services/AuthService';
import Container from './views/Container';
import Home from './views/Home';
import Login from './views/Login';
import AppTweetList from './views/AppTweetList';
import ReactRouterRelay from 'react-router-relay';
import useRelay, {RelayRouter} from 'react-router-relay';
import Relay from 'react-relay';


const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);

const requireAuth = (nextState, replace) => {
  if(!auth.loggedIn()) {
    replace({pathname: '/login'})
  }
}

var StoreQueries = {
  store: (Component) => Relay.QL`
    query {
      store {
        ${Component.getFragment('store')}
      }
    }`
};

ReactDOM.render(
  <Router history={hashHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    <Route path='/' component={Container} auth={auth}>
      <IndexRedirect to='/home' />
      <Route path='home' component={Home} onEnter={requireAuth} />
      <Route path='login' component={Login} />
      <Route path="access_token=:token" component={Login} />
      <Route path='tweets' queries={StoreQueries} component={AppTweetList} onEnter={requireAuth} />
    </Route>
  </Router>, 
  document.getElementById('root'));
