import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {JwtAuthService} from './jwt-auth.service';
import {JwtAuthInterface} from './jwt-auth.interface';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly jwtAuthService: JwtAuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '',
        });
    }

    async validate(payload: JwtAuthInterface) {
        const user = await this.jwtAuthService.validate(payload);

        if (!user) {
            throw new HttpException(`UnAuthorized user`, HttpStatus.FORBIDDEN);
        }

        return user;
    }
}
