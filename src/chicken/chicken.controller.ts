import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
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
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.chickenService.findOne({
      where: { id },
      select: { id: true, name: true, birthday: true, weight: true, steps: true, isRunning: true },
    });
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
}
