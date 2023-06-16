import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';
import { Chicken } from './entities/chicken.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CoopService } from '../coop/coop.service';

@Injectable()
export class ChickenService {
  constructor(
    @InjectRepository(Chicken)
    private chickenRepository: Repository<Chicken>,
    private coopService: CoopService,
  ) { }

  async create(createChickenDto: CreateChickenDto): Promise<Chicken> {
    const coop = createChickenDto.coopName ? await this.coopService.findOne({
      where: { name: createChickenDto.coopName },
    }) : null;

    const chicken = this.chickenRepository.create({
      name: createChickenDto.name,
      birthday: createChickenDto.birthday,
      weight: createChickenDto.weight,
      steps: createChickenDto.steps,
      isRunning: createChickenDto.isRunning,
      coop: coop,
    });
    return this.chickenRepository.save(chicken);
  }

  findAll(select: FindManyOptions<Chicken>): Promise<Chicken[]> {
    return this.chickenRepository.find(select);
  }

  findOne(where: FindOneOptions<Chicken>): Promise<Chicken | null> {
    return this.chickenRepository.findOne(where);
  }

  async replace(id: number, createChickenDto: CreateChickenDto) {
    const chicken = this.findOne({
      where: { id },
    });

    if (await chicken === null) {
      throw new NotFoundException();
    }

    const newChicken = new Chicken();
    newChicken.name = createChickenDto.name;
    newChicken.weight = createChickenDto.weight;
    newChicken.birthday = createChickenDto.birthday === undefined ? null : createChickenDto.birthday;
    newChicken.steps = createChickenDto.steps === undefined ? 0 : createChickenDto.steps;
    newChicken.isRunning = createChickenDto.isRunning === undefined ? false : createChickenDto.isRunning;

    return this.chickenRepository.update(
      {
        id,
      },
      {
        name: newChicken.name,
        birthday: newChicken.birthday,
        weight: newChicken.weight,
        steps: newChicken.steps,
        isRunning: newChicken.isRunning,
      },
    );
  }

  async update(id: number, updateChickenDto: UpdateChickenDto) {
    const chicken = this.findOne({
      where: { id },
    });

    if (await chicken === null) {
      throw new NotFoundException();
    }

    return this.chickenRepository.update(
      {
        id,
      },
      {
        name: updateChickenDto.name,
        birthday: updateChickenDto.birthday,
        weight: updateChickenDto.weight,
        steps: updateChickenDto.steps,
        isRunning: updateChickenDto.isRunning,
      },
    );
  }

  async remove(id: number): Promise<void> {
    await this.chickenRepository.delete(id);
  }

  async run(id: number) {
    const chicken = this.findOne({
      where: { id },
      select: { steps: true },
    });

    if (await chicken === null) {
      throw new NotFoundException();
    }

    return this.chickenRepository.update(
      {
        id,
      },
      {
        steps: (await chicken).steps + 1,
        isRunning: true,
      },
    );
  }
}
