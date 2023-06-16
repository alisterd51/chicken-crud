import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { ChickenService } from './chicken.service';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiForbiddenResponse, ApiBadRequestResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Chicken } from './entities/chicken.entity';

@Controller('chicken')
@ApiTags('chicken')
export class ChickenController {
  constructor(private readonly chickenService: ChickenService) {}

  @Post()
  @ApiBody({
    type: CreateChickenDto,
  })
  @ApiOperation({ summary: 'Create chicken' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Chicken,
  })
  @ApiBadRequestResponse()
  create(@Body() createChickenDto: CreateChickenDto) {
    return this.chickenService.create(createChickenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chickens' })
  @ApiOkResponse({
    description: 'get all chickens',
    type: [Chicken],
  })
  findAll() {
    return this.chickenService.findAll({
      relations: ['coop'],
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one chicken by id' })
  @ApiOkResponse({
    description: 'get one chicken',
    type: Chicken,
  })
  @ApiNotFoundResponse({
    description: 'chicken not found'
  })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const chicken = this.chickenService.findOne({
      where: { id },
      relations: ['coop'],
    });
    if (await chicken === null) {
      throw new NotFoundException();
    }
    return chicken;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Replace one chicken by id' })
  @ApiOkResponse({ description: 'replace one chicken' })
  @ApiBody({
    type: CreateChickenDto,
  })
  @ApiNotFoundResponse({
    description: 'chicken not found'
  })
  replace(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createChickenDto: CreateChickenDto,
  ) {
    return this.chickenService.replace(id, createChickenDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one chicken by id' })
  @ApiOkResponse({ description: 'update one chicken' })
  @ApiBody({
    type: UpdateChickenDto,
  })
  @ApiNotFoundResponse({
    description: 'chicken not found'
  })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateChickenDto: UpdateChickenDto,
  ) {
    return this.chickenService.update(id, updateChickenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one chicken by id' })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.chickenService.remove(id);
  }

  @Get('run/:id')
  @ApiOperation({ summary: 'Run one chicken by id' })
  @ApiOkResponse({ description: 'run one chicken' })
  @ApiNotFoundResponse({
    description: 'chicken not found'
  })
  run(@Param('id', new ParseIntPipe()) id: number) {
    return this.chickenService.run(id);
  }
}
