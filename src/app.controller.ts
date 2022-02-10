import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { getAllRepositoriesDto, SortDir } from './get-repositories.dto';
import { Repository } from './repository.interface';

import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Github Repos')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiBody({
    type: getAllRepositoriesDto,
  })
  async getRepositories(
    @Body() body: getAllRepositoriesDto,
  ): Promise<Repository[]> {
    const page = body.page || 1;
    const limit = body.limit || 20;
    const sortDir = body.sortDir || SortDir.DESC;
    const data = await this.appService.getRepositories({
      searchKey: body.searchKey,
      ignoreKey: body.ignoreKey,
      page,
      limit,
      sortDir,
    });
    if (data) {
      await this.appService.logData(data, body.searchKey);
    }
    return data;
  }
}
