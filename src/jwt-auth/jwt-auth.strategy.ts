import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {JwtAuthService} from './jwt-auth.service';
import {JwtAuthInterface} from './jwt-auth.interface';
import {ConfigService} from '../config/config.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtAuthService: JwtAuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtAuthInterface, done: VerifiedCallback) {
        const user = await this.jwtAuthService.validate(payload);

        if (!user) {
            throw new HttpException(`UnAuthorized user`, HttpStatus.FORBIDDEN);
        }

        return user;
    }
}
