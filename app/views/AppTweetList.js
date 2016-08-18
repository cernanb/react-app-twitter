import React, {Component} from 'react';
import AppTweet from './AppTweet';
import Relay from 'react-relay';
// import io from 'socket.io-client';
// let socket;



class AppTweetList extends Component {
  constructor(props) {
    super(props);
    this.state = {tweets: this.props.store.tweets};
  }

  componentDidMount() {
    var self = this;
    var socket = io();
    socket.on('tweet', function(data) {
      self.addTweet(data);
    });
  }

  addTweet(tweet) {
    console.log(tweet)
    // var updatedTweets = this.state.tweets.push(tweet);
    // console.log(updatedTweets)
    this.setState({tweets: this.state.tweets.concat([tweet])});
    // console.log(this.state.tweets)
  }

  render() {
    var appTweets = this.state.tweets.map((tweet) => {
      return <AppTweet key={tweet._id}
                       text={tweet.text}
                       author={tweet.author}
                       date={tweet.created_at} />
    });
    return (
      <div>
        <a href='/auth/twitter'>Authorize Twitter</a>
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
