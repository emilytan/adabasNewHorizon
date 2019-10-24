import { Test, TestingModule } from '@nestjs/testing';
import { FdtController } from './fdt.controller';

describe('Fdt Controller', () => {
  let controller: FdtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FdtController],
    }).compile();

    controller = module.get<FdtController>(FdtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
