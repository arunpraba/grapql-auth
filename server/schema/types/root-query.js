const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID } = graphql

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    id: { type: GraphQLID },
  }),
})
