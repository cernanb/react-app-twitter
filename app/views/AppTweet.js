import React, {Component} from 'react';

class AppTweet extends Component {

  render () {
    const tweet = this.props.text.toLowerCase();
    const strLength = tweet.length;

    const formattedDate = this.props.date.split(" ").splice(0,3).join(" ")

    let char = {}
    for (var i = 0; i < tweet.length; i++) {
      if (tweet[i] !== " ") {
        if (char[tweet[i]]) {
          char[tweet[i]] += 1;
        } else {
          char[tweet[i]] = 1;
        }
      }
    } 
    

    return (
      <div className="tweet-card">
        <h6>{this.props.author} - {formattedDate} </h6>
        {this.props.text} (length: {strLength})
        <h6>Number of each character: </h6>
        {JSON.stringify(char)}
      </div>
    );
  }
}

export default AppTweet;
