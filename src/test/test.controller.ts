import {Controller, Get} from '@nestjs/common';
import {ConfigService} from '../config/config.service';
import {VehicleTypesService} from '../services/vehicle-types.service';

@Controller('test')
export class TestController {
    constructor(private readonly configService: ConfigService, private readonly vehicleTypesService: VehicleTypesService) {}

    @Get()
    test() {
        console.log('db user...');
        console.log(this.configService.get('DATABASE_USER'));
        return this.vehicleTypesService.all();
    }
}
