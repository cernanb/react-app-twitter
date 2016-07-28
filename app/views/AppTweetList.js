import React, {Component} from 'react';
import AppTweet from './AppTweet'

class AppTweetList extends Component {
  render() {
    var appTweets = this.props.route.tweets.map((tweet) => {
      console.log('hello')
      return <AppTweet key={tweet.id}
                       text={tweet.text}
                       author={tweet.user.name}
                       date={tweet.created_at} />
    });
    return (
      <div>
        <h1>App Tweets</h1>
        {appTweets}
      </div>
    );
  }
}

export default AppTweetList;
