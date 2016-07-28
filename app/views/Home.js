import React, { PropTypes as T } from 'react'
import AuthService from '../services/AuthService';
import {Link} from 'react-router';

class Home extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout() {
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div>
        <h2>Home</h2>
        <p>Welcome {profile.name}</p>
        <Link to='tweets'><h3>My App Tweets</h3></Link>
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>
    )
  }
}

Home.contextTypes = {
  router: T.object
}

export default Home;