import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { CoopService } from './coop.service';
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { Coop } from './entities/coop.entity';

@Controller('coop')
@ApiTags('coop')
export class CoopController {
  constructor(private readonly coopService: CoopService) { }

  @Post()
  @ApiOperation({ summary: 'Create coop' })
  @ApiCreatedResponse({ description: 'coop created' })
  @ApiConflictResponse({ description: 'coop name already exists' })
  create(@Body() createCoopDto: CreateCoopDto) {
    return this.coopService.create(createCoopDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all coops' })
  @ApiOkResponse({ description: 'return all coops', type: [Coop] })
  findAll() {
    return this.coopService.findAll({
      select: { id: true, name: true },
      relations: ['chickens'],
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one coop by id' })
  @ApiOkResponse({ description: 'return coop', type: Coop })
  @ApiNotFoundResponse({ description: 'coop id not found' })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const coop = await this.coopService.findOne({
      where: { id },
      relations: ['chickens'],
    });
    if (coop === null) {
      throw new NotFoundException();
    }
    return coop;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one coop by id' })
  @ApiOkResponse({ description: 'coop updated' })
  @ApiBadRequestResponse({ description: 'name undefined' })
  @ApiNotFoundResponse({ description: 'coop id not found' })
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateCoopDto: UpdateCoopDto) {
    const coop = await this.coopService.findOne({
      where: { id },
    });
    if (coop === null) {
      throw new NotFoundException();
    }
    if (updateCoopDto.name === undefined) {
      throw new BadRequestException();
    }
    return this.coopService.update(id, updateCoopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one coop by id' })
  @ApiOkResponse({ description: 'coop deleted' })
  @ApiNotFoundResponse({ description: 'coop id not found' })
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    const coop = await this.coopService.findOne({
      where: { id },
    });
    if (coop === null) {
      throw new NotFoundException();
    }
    return this.coopService.remove(id);
  }
}
