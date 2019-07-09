import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from './config/config.module';
import * as dotenv from 'dotenv';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {VehicleTypesService} from './shared/services/vehicle-types.service';
import {VehiclesTypesEntity} from './shared/entities/vehicles-types.entity';
import {HashService} from './shared/services/hash.service';
import {UserModule} from './user/user.module';
import {APP_FILTER} from '@nestjs/core';
import {HttpExceptionFilter} from './shared/filters/http-exception.filter';
import {JwtAuthModule} from './jwt-auth/jwt-auth.module';

dotenv.config({ path: './.env' });

const HttpExceptionObj = {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
};

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
      JwtAuthModule,
      UserModule,
      TypeOrmModule.forFeature([
          VehiclesTypesEntity,
      ]),
  ],
  controllers: [AppController],
  providers: [
      AppService,
      HashService,
      HttpExceptionObj,
      VehicleTypesService,
  ],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
