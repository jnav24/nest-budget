import {Controller, Get, Res, HttpStatus, Param, Post, Body, UsePipes, UseGuards} from '@nestjs/common';
import {Response} from 'express';
import {UserService} from './user.service';
import {HashService} from '../shared/services/hash.service';
import {UserDto} from './user.dto';
import {ValidationPipe} from '../shared/pipes/validation.pipe';
import {AuthGuard} from '../shared/guards/auth.guard';

@Controller('user')
@UseGuards(new AuthGuard())
export class UserController {
    constructor(
        private readonly hashService: HashService,
        private readonly userService: UserService,
    ) {}

    @Get()
    async index(@Res() response: Response) {
        try {
            return response.status(HttpStatus.OK).json({
                data: await this.userService.all(),
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                msg: 'Something unexpected occurred',
                data: {},
            });
        }
    }

    @Get(':id')
    edit(@Param('id') id: string, @Res() response: Response) {
        try {
            return response.status(HttpStatus.OK).json({
                data: this.userService.findById(id),
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                data: {},
                msg: 'Something unexpected occurred',
            });
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async addUser(@Body() userDto: UserDto, @Res() response: Response) {
        try {
            const user = { ...userDto, password: await this.hashService.getHash(userDto.password) };
            return response.status(HttpStatus.OK).json({
                msg: '',
                data: this.userService.create(user),
            });
        } catch (error) {
            console.log(error.message);
            return response.status(HttpStatus.BAD_REQUEST).json({
                data: {},
                msg: 'Something unexpected occurred',
            });
        }
    }
}
