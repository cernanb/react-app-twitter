import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from 'graphql';

let Schema = (db) => {
  let store = {};

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      tweets: {
        type: new GraphQLList(tweetType),
        resolve: () => db.collection("tweets").find({}).toArray()
      }
    })
  });

  let tweetType  =new GraphQLObjectType({
    name: 'Tweet',
    fields: () => ({
      _id: {type: GraphQLString},
      text: {type: GraphQLString},
      created_at: {type: GraphQLString},
      author: {type: GraphQLString}
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    })
  });
  return schema

}

export default Schema;