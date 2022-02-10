import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    test('should have array of object --> Repository', async () => {
      const result = await appController.getRepositories({
        searchKey: 'GithubRepositoryChecker',
        limit: 2,
        page: 1,
      });
      expect(result[0].name).toEqual('GithubRepositoryChecker');
    });
  });
});
