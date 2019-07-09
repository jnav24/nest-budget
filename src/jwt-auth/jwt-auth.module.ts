import {Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {JwtAuthService} from './jwt-auth.service';
import {PassportModule} from '@nestjs/passport';
import {JwtAuthStrategy} from './jwt-auth.strategy';
import {UserModule} from '../user/user.module';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
    imports: [
        passportModule,
        JwtModule.register({
            secretOrPrivateKey: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        UserModule,
    ],
    providers: [
        JwtAuthService,
        JwtAuthStrategy,
    ],
    exports: [
        JwtAuthService,
        passportModule,
    ],
})
export class JwtAuthModule {}
