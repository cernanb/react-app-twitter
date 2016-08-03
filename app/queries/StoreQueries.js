import Relay from 'react-relay';

export default {
  store: (Component) => Relay.QL`
    query { 
      store { 
        ${Component.getFragment('store')}
      }
    }
  `
};