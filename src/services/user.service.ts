import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {Repository} from 'typeorm';
import {UserDto} from '../dto/user.dto';

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

    async create(user: UserDto) {
        const userObj: any = await this.user.create(user);
        await this.user.save(userObj);
        return await this.findById(userObj.id);
    }

    async update(id: string, data: any) {
        await this.user.update(id, data);
        return await this.findById(id);
    }

    async destroy(id: string) {
        await this.user.delete(id);
    }
}
