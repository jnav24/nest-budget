import {forwardRef, Module} from '@nestjs/common';
import {JwtAuthService} from './jwt-auth.service';
import {JwtAuthStrategy} from './jwt-auth.strategy';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {JwtAuthController} from './jwt-auth.controller';
import {SharedModule} from '../shared/shared.module';
import {ConfigService} from '../config/config.service';

const env = new ConfigService().read();

@Module({
    controllers: [
        JwtAuthController,
    ],
    imports: [
        forwardRef(() => SharedModule),
        JwtModule.register({
            secretOrPrivateKey: env.JWT_SECRET,
            signOptions: {
                expiresIn: 3600,
            },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
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
