import {Controller, Get} from '@nestjs/common';
import {ConfigService} from '../config/config.service';
import {VehicleTypesService} from '../services/vehicle-types.service';
import {UserService} from '../services/user.service';

@Controller('test')
export class TestController {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly vehicleTypesService: VehicleTypesService,
    ) {}

    @Get()
    test() {
        console.log('db user... working');
        return this.vehicleTypesService.all();
    }

    @Get('user')
    testUser() {
        return this.userService.all();
    }
}
