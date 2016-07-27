import React, {Component} from 'react';
import AuthService from '../services/AuthService';

class Login extends Component {

  handleSubmit(e) {
    e.preventDefault();

    this.props.auth.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }, function(err) {
      if (err) alert("error: " + err.message);
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label><input ref="email" placeholder="email" /></label> <br /><br/> 
          <label><input ref="pass" placeholder="password" /></label> <br /><br/>
          <button type="submit">Log In</button>
        </form>
      </div>
    )
  }
}

export default Login;
