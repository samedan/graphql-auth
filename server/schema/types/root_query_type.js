const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        // if logged signedin, {req} has a user property, if not undefined => null
        return req.user;
      },
    },
  },
});

module.exports = RootQueryType;
