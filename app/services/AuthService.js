import Auth0Lock from 'auth0-lock';
import {EventEmitter} from 'events'
import {isTokenExpired} from './jwt';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    this.lock = new Auth0Lock(clientId, domain, {})

    this.lock.on('authenticated', this._doAuthentication.bind(this))

    this.lock.on('authorization_error', this._authorizationError.bind(this))

    this.login = this.login.bind(this)
  }


  _doAuthentication(authResult) {
    this.setToken(authResult.idToken)

    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading profile, ' + error)
      } else {
        this.setProfile(profile);
      }
    })
  }

  login() {
    this.lock.show();
  }

  _authorizationError(error) {
    console.log('Authentication error', error)
  }

  loggedIn() {
    const token = this.getToken();
    return !!token
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
    this.emit('profile_updated', profile)
  }

  getProfile() {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
