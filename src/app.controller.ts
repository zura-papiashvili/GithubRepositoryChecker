import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { getAllRepositoriesSto, SortDir } from './get-repositories.dto';
import { Repository } from './repository.interface';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Github Repos')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: getAllRepositoriesSto,
  })
  async getRepositories(
    @Body() query: getAllRepositoriesSto,
  ): Promise<Repository[]> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const sortDir = query.sortDir || SortDir.DESC;
    const data = await this.appService.getRepositories({
      searchKey: query.searchKey,
      ignoreKey: query.ignoreKey,
      page,
      limit,
      sortDir,
    });
    const randomName = uuid();
    fs.writeFile(
      `${process.env.LOG_DIR}/${randomName}.txt`,
      JSON.stringify(data),
      function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      },
    );
    return data;
  }
}
