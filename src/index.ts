import { ApolloServer } from 'apollo-server';

import { JokesAPI } from './provider';
import { resolvers, typeDefs } from './resolver';

/*
 * TYPES
 */

export interface Context {
  dataSources: {
    jokesAPI: JokesAPI;
  };
}

/*
 * DATA SOURCES
 */

const dataSources = (): Context['dataSources'] => {
  return {
    jokesAPI: new JokesAPI()
  };
};

/*
 * SERVER
 */

const server = new ApolloServer({
  typeDefs,
  // @ts-ignore (FIXME: should be casted to default Resolvers type?)
  resolvers,
  dataSources
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // tslint:disable-line no-console
});
