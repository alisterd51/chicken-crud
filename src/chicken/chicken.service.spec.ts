import { Test, TestingModule } from '@nestjs/testing';
import { ChickenService } from './chicken.service';

describe('ChickenService', () => {
  let service: ChickenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChickenService],
    }).compile();

    service = module.get<ChickenService>(ChickenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
