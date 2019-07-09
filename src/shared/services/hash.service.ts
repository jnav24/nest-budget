import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    private saltRounds = 10;

    async getHash(value: string): Promise<string> {
        return await bcrypt.hash(value, this.saltRounds);
    }

    async verify(value: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(value, hash);
    }
}
