import React, {Component} from 'react';
import AppTweet from './AppTweet';
import Relay from 'react-relay';


class AppTweetList extends Component {

  render() {
    console.log(this.props)
    var appTweets = this.props.route.tweets.slice(0, this.props.route.limit).map((tweet) => {
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

// export default Relay.createContainer(AppTweetList, {
//   fragments: {
//     store: () => Relay.QL`
//       fragment on Store {
//         tweets {
//           _id,
//           text,
//           author, 
//           date
//         }
//       }
//     `
//   }
// });

export default AppTweetList;
