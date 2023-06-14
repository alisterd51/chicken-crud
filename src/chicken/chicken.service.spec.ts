import { Test, TestingModule } from '@nestjs/testing';
import { ChickenService } from './chicken.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Chicken } from './entities/chicken.entity';

const mockChicken = new Chicken();
mockChicken.id = 42;
mockChicken.name = 'john';
mockChicken.weight = 42;
mockChicken.birthday = new Date();
mockChicken.steps = 0;
mockChicken.isRunning = false;

describe('ChickenService', () => {
  let service: ChickenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChickenService,
        {
          provide: getRepositoryToken(Chicken),
          useValue: {
            save: jest.fn().mockResolvedValue(mockChicken),
            find: jest.fn().mockResolvedValue([mockChicken]),
          },
        },
      ],
    }).compile();

    service = module.get<ChickenService>(ChickenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
