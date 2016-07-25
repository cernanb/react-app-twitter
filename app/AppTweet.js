import React, {Component} from 'react';

class AppTweet extends Component {
  render () {
    return (
      <div className="tweet-card">
        <h6>{this.props.author} - {this.props.date} </h6>
        {this.props.text}
        <h6>Number of characters: </h6>

      </div>
    );
  }
}

export default AppTweet;
