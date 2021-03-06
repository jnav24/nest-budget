import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import {JwtAuthInterface} from './jwt-auth.interface';

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    async sign(payload: JwtAuthInterface): Promise<any> {
        return await this.jwtService.sign(payload);
    }

    async validate(payload: JwtAuthInterface): Promise<any> {
        return await this.userService.findByEmail(payload.email);
    }
}
