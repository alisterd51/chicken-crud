import { Test, TestingModule } from '@nestjs/testing';
import { ChickenController } from './chicken.controller';
import { ChickenService } from './chicken.service';

describe('ChickenController', () => {
  let controller: ChickenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChickenController],
      providers: [ChickenService],
    }).compile();

    controller = module.get<ChickenController>(ChickenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
