import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { getAllRepositoriesSto } from './get-repositories.dto';
import { Repository } from './repository.interface';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getRepositories(query: getAllRepositoriesSto): Promise<Repository[]> {
    const gitQuery = `https://api.github.com/search/repositories?q=${query.searchKey}&page=${query.page}&per_page=${query.limit}&order=${query.sortDir}`;
    let result = null;
    await fetch(gitQuery)
      .then((res) => res.json())
      .then((text) => (result = text));

    result = result.items.map((item) => ({
      name: item.name,
      full_name: item.full_name,
      html_url: item.html_url,
      description: item.description,
      url: item.url,
    }));
    if (query.ignoreKey) {
      result = result.filter((item) => {
        return !item.name.includes(query.ignoreKey);
      });
    }
    return result;
  }
}
