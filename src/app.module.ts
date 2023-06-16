import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChickenModule } from './chicken/chicken.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chicken } from './chicken/entities/chicken.entity';
import { DataSource } from 'typeorm';
import { CoopModule } from './coop/coop.module';
import { Coop } from './coop/entities/coop.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Chicken, Coop],
      synchronize: true,
    }),
    ChickenModule,
    CoopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
