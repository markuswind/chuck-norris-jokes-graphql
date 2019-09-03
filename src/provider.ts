import { RESTDataSource } from 'apollo-datasource-rest';
import { QueryJokeArgs, QueryRandomJokesArgs } from './generated/graphql';

/*
 * DATA SOURCE
 */

export class JokesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.icndb.com/';
  }

  public async getJoke(args: QueryJokeArgs) {
    const result = await this.get(`jokes/${args.id}`);
    return result.value;
  }

  public async getRandomJokes(args: QueryRandomJokesArgs) {
    let url = `jokes/random/${args.limit}`;

    if (args.categories && args.categories.length) {
      url += `?limitTo=${args.categories}`;
    }

    const result = await this.get(url);
    return result.value;
  }

  public async getJokesCount() {
    const result = await this.get(`jokes/count`);
    return result.value;
  }

  public async getCategories() {
    const result = await this.get(`categories`);
    return result.value;
  }
}
