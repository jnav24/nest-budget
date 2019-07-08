import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>,
    ) {}

    all(): Promise<User[]> {
        return this.user.find();
    }

    findById(id: string): Promise<User> {
        return this.user.findOne(id);
    }
}
