## About

A Graphql api which returns Chuck Noriss jokes from [api.icndb]('http://api.icndb.com').

## Getting started

First clone the repository and install dependencies.

```bash
$ git clone https://github.com/markuswind/apollo-server-boilerplate
$ npm ci
$ npm run start
```

## Adding new (type safe) resolvers

Because we want to have type safe resolvers, it's the easiest to create new resolvers in order described below.

#### Type definitions

When adding new resolvers you should start with adding the `typeDefs` in your (new) `resolver.ts` file like following:

```ts
export const typeDefs = grapql`
  type Example {
    id: Int!
  }

  type Query {
    example(id: Int!): Example!
  }
`;
```

#### Generating types

The next step is updating the generated types like following:

```bash
$ npm run generate:types
```

#### Provider

After this you could create your update your (new) `provider.ts` file like following:

```ts
import { QueryExampleArgs } from './generated/graphql';

export class ExampleAPI extends RestDataSource {
  // ... constructor

  public async getExample(args: QueryExampleArgs) {
    // ... use typed args to return result
  }
}
```

**NOTE:** When adding a new provider you'll have to update the **context** in the `index.ts` file.

#### Resolvers

Finally you could create your typed resolvers in the `resolvers.ts` file like following:

```ts
import { IResolvers } from './generated/grapql';

export const resolvers: IResolvers = {
  Query: {
    example: (_, args, ctx) => ctx.dataSources.ExampleAPI.getExample(args)
  }
};
```
