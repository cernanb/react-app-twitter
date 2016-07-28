import React, {Component} from 'react';
import AuthService from '../services/AuthService';

export class Login extends Component {
  render() {
    const {auth} = this.props;

    return(
      <div>
        <h2>Login</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    )
  }
}

export default Login;