import React, {Component} from 'react';
import AppTweet from './AppTweet'

class AppTweetList extends Component {
  render() {
    console.log(this.props.tweets[0].user.name);
    var appTweets = this.props.tweets.map((tweet) => {
      return <AppTweet key={tweet.id}
                       text={tweet.text}
                       author={tweet.user.name}
                       date={tweet.created_at} />
    });
    return (
      <div>
        <h1>{this.props.tweets[0].user.name}'s' App Tweets</h1>
        {appTweets}
      </div>
    );
  }
}

export default AppTweetList;
