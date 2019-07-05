import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from './config/config.module';
import { TestController } from './test/test.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';

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
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
