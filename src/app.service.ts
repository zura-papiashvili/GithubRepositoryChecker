import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { getAllRepositoriesDto } from './get-repositories.dto';
import { Repository } from './repository.interface';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getRepositories(query: getAllRepositoriesDto): Promise<Repository[]> {
    const gitQuery = `https://api.github.com/search/repositories?q=${query.searchKey}&page=${query.page}&per_page=${query.limit}&sort=name&order=${query.sortDir}`;
    let result = null;
    await fetch(gitQuery)
      .then((res) => res.json())
      .then((data) => (result = data));

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

  async logData(data: Repository[], prefix: string): Promise<void> {
    const randomName = uuid();
    fs.writeFile(
      `${process.env.LOG_DIR}/${prefix}${randomName}.json`,
      JSON.stringify(data),
      'utf8',
      function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      },
    );
    return;
  }
}
