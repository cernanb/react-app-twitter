import React, {Component} from 'react';
import Relay from 'react-relay';

export class Container extends Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth
      })
    }

    return (
      <div>
        {children}
      </div>
    )
  }
} 

export default Container;