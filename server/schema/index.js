const graphql = require('graphql')
const { GraphQLSchema } = graphql
const RootQueryType = require('./types/root-query')

module.exports = new GraphQLSchema({
  query: RootQueryType,
})
