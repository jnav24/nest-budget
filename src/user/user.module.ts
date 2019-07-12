import {forwardRef, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {HashService} from '../shared/services/hash.service';
import {JwtAuthModule} from '../jwt-auth/jwt-auth.module';

@Module({
    controllers: [UserController],
    imports: [
        forwardRef(() => JwtAuthModule),
        TypeOrmModule.forFeature([
           User,
        ]),
    ],
    providers: [
        HashService,
        UserService,
    ],
    exports: [
        HashService,
        UserService,
    ],
})
export class UserModule {}
