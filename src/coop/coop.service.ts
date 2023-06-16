import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';
import { Coop } from './entities/coop.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoopService {
  constructor(
    @InjectRepository(Coop)
    private coopRepository: Repository<Coop>,
  ) { }

  async create(createCoopDto: CreateCoopDto): Promise<Coop> {
    const searchName = this.findOne({
      where: { name: createCoopDto.name },
    });

    if (await searchName !== null) {
      throw new ConflictException();
    }

    const coop = this.coopRepository.create({
      name: createCoopDto.name,
    });
    return this.coopRepository.save(coop);
  }

  findAll(select: FindManyOptions<Coop>): Promise<Coop[]> {
    return this.coopRepository.find(select);
  }

  findOne(where: FindManyOptions<Coop>): Promise<Coop> {
    return this.coopRepository.findOne(where);
  }

  update(id: number, updateCoopDto: UpdateCoopDto) {
    return this.coopRepository.update(
      {
        id,
      },
      {
        name: updateCoopDto.name,
      },
    );
  }

  remove(id: number): Promise<DeleteResult> {
    return this.coopRepository.delete(id);
  }
}
