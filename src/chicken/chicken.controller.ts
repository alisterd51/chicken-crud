import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { ChickenService } from './chicken.service';
import { CreateChickenDto } from './dto/create-chicken.dto';
import { UpdateChickenDto } from './dto/update-chicken.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('chicken')
@ApiTags('chicken')
export class ChickenController {
  constructor(private readonly chickenService: ChickenService) {}

  @Post()
  @ApiBody({
    type: CreateChickenDto,
  })
  create(@Body() createChickenDto: CreateChickenDto) {
    return this.chickenService.create(createChickenDto);
  }

  @Get()
  findAll() {
    return this.chickenService.findAll({
      select: { id: true, name: true, birthday: true, weight: true, steps: true, isRunning: true },
    });
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const chicken = this.chickenService.findOne({
      where: { id },
      select: { id: true, name: true, birthday: true, weight: true, steps: true, isRunning: true },
    });
    if (await chicken === null) {
      throw new NotFoundException();
    }
    return chicken;
  }

  @Put(':id')
  replace(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateChickenDto: UpdateChickenDto,
  ) {
    return this.chickenService.update(id, updateChickenDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateChickenDto: UpdateChickenDto,
  ) {
    return this.chickenService.update(id, updateChickenDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.chickenService.remove(id);
  }

  @Get('run/:id')
  run(@Param('id', new ParseIntPipe()) id: number) {
    return this.chickenService.run(id);
  }
}
