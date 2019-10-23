import { Test, TestingModule } from '@nestjs/testing';
import { FileIoController } from './file-io.controller';

describe('FileIo Controller', () => {
  let controller: FileIoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileIoController],
    }).compile();

    controller = module.get<FileIoController>(FileIoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
