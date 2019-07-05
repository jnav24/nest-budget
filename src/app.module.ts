import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from './config/config.module';
import { TestController } from './test/test.controller';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

@Module({
  imports: [
      ConfigModule,
  ],
  controllers: [AppController, TestController],
  providers: [
      AppService,
  ],
})
export class AppModule {
}
