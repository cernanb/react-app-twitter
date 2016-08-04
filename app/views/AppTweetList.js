import React, {Component} from 'react';
import AppTweet from './AppTweet';
import Relay from 'react-relay';


class AppTweetList extends Component {

  render() {
    var appTweets = this.props.store.tweets.map((tweet) => {
      return <AppTweet key={tweet._id}
                       text={tweet.text}
                       author={tweet.author}
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

AppTweetList =  Relay.createContainer(AppTweetList, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        tweets {
          _id,
          text,
          created_at,
          author
        }
      }
    `
  }
});

export default AppTweetList;
