import { gql } from 'apollo-server';

import { IResolvers } from './generated/graphql';
import { Context } from './index';

/*
 * TYPE DEFS
 */

export const typeDefs = gql`
  type Joke {
    id: Int!
    joke: String!
    categories: [String!]
  }

  type Query {
    joke(id: Int!): Joke!
    randomJokes(limit: Int!, categories: [String!]): [Joke!]
    jokesCount: Int!
    categories: [String!]
  }
`;

/*
 * HELPERS
 */

const getJokesAPI = (context: Context) => context.dataSources.jokesAPI;

/*
 * RESOLVERS
 */

export const resolvers: IResolvers = {
  Query: {
    joke: (_, args, ctx) => getJokesAPI(ctx).getJoke(args),
    randomJokes: (_, args, ctx) => getJokesAPI(ctx).getRandomJokes(args),
    jokesCount: (_, __, ctx) => getJokesAPI(ctx).getJokesCount(),
    categories: (_, __, ctx) => getJokesAPI(ctx).getCategories()
  }
};
