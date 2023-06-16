import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CoopService } from './coop.service';
import { CreateCoopDto } from './dto/create-coop.dto';
import { UpdateCoopDto } from './dto/update-coop.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('coop')
@ApiTags('coop')
export class CoopController {
  constructor(private readonly coopService: CoopService) {}

  @Post()
  @ApiOperation({ summary: 'Create coop' })
  create(@Body() createCoopDto: CreateCoopDto) {
    return this.coopService.create(createCoopDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all coops' })
  findAll() {
    return this.coopService.findAll({
      select: { id: true, name: true },
      relations: ['chickens'],
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one coop by id' })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.coopService.findOne({
      where: { id },
      relations: ['chickens'],
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one coop by id' })
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateCoopDto: UpdateCoopDto) {
    return this.coopService.update(id, updateCoopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one coop by id' })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.coopService.remove(id);
  }
}
