import { gql } from 'apollo-server';

/*
 * TYPE DEFS
 */

export const typeDefs = gql`
  type Joke {
    id: Int!
    joke: String!
    categories: [String]
  }

  type Query {
    joke(id: Int!): Joke!
    randomJokes(limit: Int!, categories: [String!]): [Joke]
    jokesCount: Int!
    categories: [String!]
  }
`;

/*
 * RESOLVERS
 */

export const resolvers = {
  Query: {
    joke: (_, args, { dataSources }) => dataSources.jokesAPI.getJoke(args),
    randomJokes: (_, args, { dataSources }) =>
      dataSources.jokesAPI.getRandomJokes(args),
    jokesCount: (_, __, { dataSources }) =>
      dataSources.jokesAPI.getJokesCount(),
    categories: (_, __, { dataSources }) => dataSources.jokesAPI.getCategories()
  }
};
