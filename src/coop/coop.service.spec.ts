import { Test, TestingModule } from '@nestjs/testing';
import { CoopService } from './coop.service';
import { Chicken } from '../chicken/entities/chicken.entity';
import { Coop } from './entities/coop.entity';
import { ChickenService } from '../chicken/chicken.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockChicken = new Chicken();
mockChicken.id = 42;
mockChicken.name = 'john';
mockChicken.weight = 42;
mockChicken.birthday = new Date();
mockChicken.steps = 0;
mockChicken.isRunning = false;
const mockCoop = new Coop();
mockCoop.id = 42;
mockCoop.name = 'john coop';

describe('CoopService', () => {
  let service: CoopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChickenService,
        CoopService,
        {
          provide: getRepositoryToken(Chicken),
          useValue: {
            save: jest.fn().mockResolvedValue(mockChicken),
            find: jest.fn().mockResolvedValue([mockChicken]),
          },
        },
        {
          provide: getRepositoryToken(Coop),
          useValue: {
            save: jest.fn().mockResolvedValue(mockCoop),
            find: jest.fn().mockResolvedValue([mockCoop]),
          },
        },
      ],
    }).compile();

    service = module.get<CoopService>(CoopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
