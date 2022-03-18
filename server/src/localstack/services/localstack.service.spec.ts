import { Test, TestingModule } from '@nestjs/testing';
import { LocalstackService } from './localstack.service';

describe('LocalstackService', () => {
  let service: LocalstackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalstackService],
    }).compile();

    service = module.get<LocalstackService>(LocalstackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
