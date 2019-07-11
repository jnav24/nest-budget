import {Body, Controller, HttpException, HttpStatus, Post, UsePipes} from '@nestjs/common';
import {JwtAuthService} from './jwt-auth.service';
import {UserDto} from '../user/user.dto';
import {ValidationPipe} from '../shared/pipes/validation.pipe';
import {ConfigService} from '../config/config.service';
import {UserService} from '../user/user.service';
import {HashService} from '../shared/services/hash.service';
import {UserInterface} from '../user/user.interface';

@Controller('auth')
export class JwtAuthController {
    private readonly env;

    constructor(
        private readonly authService: JwtAuthService,
        private readonly config: ConfigService,
        private readonly hashService: HashService,
        private readonly userService: UserService,
    ) {
        this.env = config.read();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async authenticate(@Body() userDto: UserDto) {
        try {
            const user: UserInterface = await this.userService.findByEmail(userDto.username);
            const { password } = await this.userService.getPasswordByEmail(userDto.username);

            if (await this.hashService.verify(userDto.password, password)) {
                const token = await this.authService.sign({ email: user.username });

                return {
                    token,
                    user: this.userService.toResponseObject(user),
                };
            }

            throw new HttpException(`Username and/or password is incorrect`, HttpStatus.UNAUTHORIZED);
        } catch (error) {
            throw new HttpException(`${error.response}`, HttpStatus.BAD_REQUEST);
        }
    }
}
