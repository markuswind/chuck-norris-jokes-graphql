import { ApolloServer } from 'apollo-server';

import { JokesAPI } from './provider';
import { resolvers, typeDefs } from './resolver';

/*
 * SERVER
 */

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      jokesAPI: new JokesAPI()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // tslint:disable-line no-console
});
