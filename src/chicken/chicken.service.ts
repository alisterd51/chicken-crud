import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';
import { Chicken } from './entities/chicken.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ChickenService {
  constructor(
    @InjectRepository(Chicken)
    private chickenRepository: Repository<Chicken>,
  ) { }

  async create(createChickenDto: CreateChickenDto): Promise<Chicken> {
    const chicken = this.chickenRepository.create({
      name: createChickenDto.name,
      birthday: createChickenDto.birthday,
      weight: createChickenDto.weight,
      steps: createChickenDto.steps,
      isRunning: createChickenDto.isRunning,
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

    const newChicken = this.chickenRepository.create({
      name: createChickenDto.name,
      birthday: createChickenDto.birthday,
      weight: createChickenDto.weight,
      steps: createChickenDto.steps,
      isRunning: createChickenDto.isRunning,
    });

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
