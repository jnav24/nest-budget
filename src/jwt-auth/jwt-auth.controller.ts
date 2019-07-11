import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {JwtAuthService} from './jwt-auth.service';
import {UserDto} from '../user/user.dto';
import {ValidationPipe} from '../shared/pipes/validation.pipe';
import {ConfigService} from '../config/config.service';

@Controller('auth')
export class JwtAuthController {
    private readonly env;

    constructor(
        private readonly authService: JwtAuthService,
        private readonly config: ConfigService,
    ) {
        this.env = config.read();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    authenticate(@Body() userDto: UserDto) {
        console.log('jwt-auth.login');
        console.log(this.env.JWT_SECRET);
        console.log(this.authService.sign({ email: userDto.username }));
        return userDto;
    }
}
