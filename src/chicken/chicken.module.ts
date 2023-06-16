import { Module } from '@nestjs/common';
import { ChickenService } from './chicken.service';
import { ChickenController } from './chicken.controller';
import { Chicken } from './entities/chicken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoopModule } from 'src/coop/coop.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chicken]), CoopModule],
  controllers: [ChickenController],
  providers: [ChickenService],
  exports: [TypeOrmModule, ChickenService],
})
export class ChickenModule { }
