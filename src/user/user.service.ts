import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository} from 'typeorm';
import {UserDto} from './user.dto';
import {UserInterface} from './user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>,
    ) {}

    async all(): Promise<User[]> {
        return await this.user.find();
    }

    async findById(id: string): Promise<User> {
        return await this.user.findOne(id);
    }

    async findByEmail(email): Promise<User> {
        return await this.user.findOne({ where: { username: email } });
    }

    async create(user: UserDto) {
        try {
            const userObj: UserInterface = await this.user.create(user);
            await this.user.save(userObj);
            return { data: { ...await this.findById(userObj.id) }, success: true };
        } catch (error) {
            return {
                success: false,
                msg: 'Unable to create user at this time.',
            };
        }
    }

    async update(id: string, data: any) {
        await this.user.update(id, data);
        return await this.findById(id);
    }

    async destroy(id: string) {
        await this.user.delete(id);
    }

    toResponseObject(user: UserInterface) {
        const { id, username, createdAt } = user;
        return { id, username, createdAt };
    }
}
