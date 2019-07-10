import {forwardRef, Module} from '@nestjs/common';
import {JwtAuthService} from './jwt-auth.service';
import {JwtAuthStrategy} from './jwt-auth.strategy';
import {JwtModule} from '@nestjs/jwt';
import {UserModule} from '../user/user.module';
import {PassportModule} from '@nestjs/passport';

@Module({
    imports: [
        JwtModule.register({
            secretOrPrivateKey: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => UserModule),
    ],
    providers: [
        JwtAuthService,
        JwtAuthStrategy,
    ],
    exports: [
        JwtAuthService,
        JwtModule,
        PassportModule,
    ],
})
export class JwtAuthModule {}
