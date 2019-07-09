import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {HashService} from '../shared/services/hash.service';

@Module({
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([
           User,
        ]),
    ],
    providers: [
        HashService,
        UserService,
    ],
})
export class UserModule {}
