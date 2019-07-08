import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {ConfigService} from '../config/config.service';
import {VehicleTypesService} from '../services/vehicle-types.service';
import {Response} from 'express';

@Controller('test')
export class TestController {
    constructor(
        private readonly configService: ConfigService,
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
}
