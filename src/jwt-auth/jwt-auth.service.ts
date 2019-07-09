import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import {JwtAuthInterface} from './jwt-auth.interface';

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async sign(): Promise<any> {
        return this.jwtService.sign({ email: 'hello@gmail.com' });
    }

    async validate(payload: JwtAuthInterface): Promise<any> {
        return await this.userService.findByEmail(payload.email);
    }
}
