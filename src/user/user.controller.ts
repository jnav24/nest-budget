import {Controller, Get, Res, HttpStatus, Param, Post, Body} from '@nestjs/common';
import {Response} from 'express';
import {UserService} from './user.service';
import {HashService} from '../services/hash.service';
import {UserDto} from './user.dto';

@Controller('user')
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
