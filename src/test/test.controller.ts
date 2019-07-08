import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {ConfigService} from '../config/config.service';
import {VehicleTypesService} from '../services/vehicle-types.service';
import {UserService} from '../services/user.service';
import {UserDto} from '../dto/user.dto';
import {HashService} from '../services/hash.service';
import {Response} from 'express';

@Controller('test')
export class TestController {
    constructor(
        private readonly configService: ConfigService,
        private readonly hashService: HashService,
        private readonly userService: UserService,
        private readonly vehicleTypesService: VehicleTypesService,
    ) {}

    @Get()
    test(@Res() res: Response) {
        console.log('db user... working');
        // console.log(HttpStatus.OK);
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({
                data: this.vehicleTypesService.all(),
            });
    }

    @Get('user')
    testUsers() {
        return this.userService.all();
    }

    @Get('user/:id')
    testGetUser(@Param() param) {
        return this.userService.findById(param.id);
    }

    @Post('user')
    async testPostUser(@Body() userDto: UserDto) {
        try {
            const user = { ...userDto, password: await this.hashService.getHash(userDto.password) };
            return {
                status: 200,
                msg: 'yippe!',
                data: await this.userService.create(user),
            };
        } catch (error) {
            // console.log(error);
            console.log(error.message);
            return {
                status: 500,
                data: {},
                msg: '',
            };
        }
    }
}
