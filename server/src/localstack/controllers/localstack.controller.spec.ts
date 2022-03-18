import { Test, TestingModule } from '@nestjs/testing';
import { LocalstackController } from './localstack.controller';

describe('LocalstackController', () => {
  let controller: LocalstackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalstackController],
    }).compile();

    controller = module.get<LocalstackController>(LocalstackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
