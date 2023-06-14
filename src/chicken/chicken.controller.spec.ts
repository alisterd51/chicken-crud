import { Test, TestingModule } from '@nestjs/testing';
import { ChickenController } from './chicken.controller';
import { ChickenService } from './chicken.service';

describe('ChickenController', () => {
  let controller: ChickenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChickenController],
      providers: [
        ChickenService,
        {
          provide: ChickenService,
          useValue: {
            getAll: jest
              .fn()
              .mockResolvedValue([{
                "name": "john",
                "birthday": "2023-06-14T20:39:17.394Z",
                "weight": 42
              }]),
          },
        },
      ],
    }).compile();

    controller = module.get<ChickenController>(ChickenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
