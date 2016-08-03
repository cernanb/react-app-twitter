import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {MongoClient} from 'mongodb';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
var dotenv = require('dotenv');
dotenv.load();

let app = express();
app.use(express.static('public'));

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

})();