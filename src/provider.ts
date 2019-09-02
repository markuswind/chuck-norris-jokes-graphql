import { RESTDataSource } from 'apollo-datasource-rest';

/*
 * DATA SOURCE
 */

export class JokesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.icndb.com/';
  }

  public async getJoke(args: { id: number }) {
    const result = await this.get(`jokes/${args.id}`);
    return result.value;
  }

  public async getRandomJokes(args: {
    limit: number;
    categories?: ReadonlyArray<string>;
  }) {
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
