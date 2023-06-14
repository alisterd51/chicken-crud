import { Module } from '@nestjs/common';
import { ChickenService } from './chicken.service';
import { ChickenController } from './chicken.controller';
import { Chicken } from './entities/chicken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chicken])],
  controllers: [ChickenController],
  providers: [ChickenService],
  exports: [TypeOrmModule, ChickenService],
})
export class ChickenModule { }
