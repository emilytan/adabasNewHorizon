import { Test, TestingModule } from '@nestjs/testing';
import { SqlController } from './sql.controller';

describe('Sql Controller', () => {
  let controller: SqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqlController],
    }).compile();

    controller = module.get<SqlController>(SqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
