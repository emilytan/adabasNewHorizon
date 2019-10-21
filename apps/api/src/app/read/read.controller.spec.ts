import { Test, TestingModule } from '@nestjs/testing';
import { ReadController } from './read.controller';

describe('Read Controller', () => {
  let controller: ReadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadController],
    }).compile();

    controller = module.get<ReadController>(ReadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
