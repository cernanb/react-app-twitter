import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {MongoClient} from 'mongodb';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import passport from 'passport';
import session from 'express-session';
var TwitterStrategy = require('passport-twitter').Strategy;
var querystring = require('querystring');
var dotenv = require('dotenv');
import oauth from 'oauth';
dotenv.load();
var router = express.Router();
var twitterStream = require('./app/services/twitterStream');
var stream;


let app = express();
app.use(express.static('public'));

app.use(session({
  secret: 'myapp',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/#/tweets',
  failure: '/error/'
}));

(async () => {

  let db = await MongoClient.connect('mongodb://rjrstack:4405ash@ds023245.mlab.com:23245/rgrstack');
  let schema = Schema(db);

  app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true
  }));

  app.listen(5000, () => console.log('Listening on port 5000...'));

  let json = await graphql(schema, introspectionQuery);
  fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
    if (err) throw err;

    console.log("JSON schema created");
  });

  var ts = new TwitterStrategy({
    consumerKey: 'v5QzZt6nOIdOU4SGrBDuS3hEB',
    consumerSecret: '6iJukgMQ11sYRfSsPB5LpFDmz1QSvikoJEbEnhlHwidAjykbba',
    callbackURL: 'http://localhost:5000/auth/twitter/callback',
    passReqToCallback: true},
    function(req, token, tokenSecret, profile, done) {
      
      let query = {
        'twitter.id': profile.id
      }

      db.collection('users').findOne(query)
        .then(function(user) {
          // console.log(error)
          if (user) {
            done(null, user)
          }
          else {
            // console.log('inside else')
            let user = {};
            user.image = profile._json.profile_image_url;
            user.displayName = profile.displayName;

            user.twitter = {};
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.twitter.tokenSecret = tokenSecret;
            console.log(user)
            db.collection("users").save(user);
            done(null, user);
          }
        })

      stream = new twitterStream({
        consumer_key: 'v5QzZt6nOIdOU4SGrBDuS3hEB',
        consumer_secret: '6iJukgMQ11sYRfSsPB5LpFDmz1QSvikoJEbEnhlHwidAjykbba',
        access_token_key: token,
        access_token_secret: tokenSecret
      });
      // console.log(stream)
       stream.stream();

      stream.on('data', function(json) {
        if (json.text) {
          let tweet = {};
          tweet.text = json.text;
          tweet.created_at = json.created_at;
          tweet.author = json.user.name;
          db.collection("tweets").save(tweet);
          console.log('this is a tweet')
        }
        // console.log(json);
      })

    }
  )

  passport.use(ts);

  // stream.stream();

  // stream.on('data', function(json) {
  //   console.log(json);
  // })

})();












