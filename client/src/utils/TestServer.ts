import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers: any = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

export const server = new GraphQLServer({ typeDefs, resolvers })