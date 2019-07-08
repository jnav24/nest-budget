import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from './config/config.module';
import { TestController } from './test/test.controller';
import * as dotenv from 'dotenv';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {VehicleTypesService} from './services/vehicle-types.service';
import {VehiclesTypesEntity} from './entities/vehicles-types.entity';
import {UserService} from './services/user.service';
import {User} from './entities/user.entity';
import {HashService} from './services/hash.service';

dotenv.config({ path: './.env' });

@Module({
  imports: [
      ConfigModule,
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: 3306,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
      TypeOrmModule.forFeature([
          User,
          VehiclesTypesEntity,
      ]),
  ],
  controllers: [AppController, TestController],
  providers: [
      AppService,
      HashService,
      UserService,
      VehicleTypesService,
  ],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
