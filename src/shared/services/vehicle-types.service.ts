import {Injectable} from '@nestjs/common';
import {VehiclesTypesEntity} from '../entities/vehicles-types.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class VehicleTypesService {
    constructor(@InjectRepository(VehiclesTypesEntity) private readonly vehicleTypesRepository: Repository<VehiclesTypesEntity>) {}

    all(): Promise<VehiclesTypesEntity[]> {
        return this.vehicleTypesRepository.find();
    }
}
