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
    joke: (_, { id }, { dataSources }) => dataSources.jokesAPI.getJoke(id),
    randomJokes: (_, { limit, categories }, { dataSources }) =>
      dataSources.jokesAPI.getRandomJokes(limit, categories),
    jokesCount: (_, __, { dataSources }) =>
      dataSources.jokesAPI.getJokesCount(),
    categories: (_, __, { dataSources }) => dataSources.jokesAPI.getCategories()
  }
};
