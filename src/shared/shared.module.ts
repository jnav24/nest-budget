import {Module} from '@nestjs/common';
import {UserModule} from '../user/user.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

@Module({
    imports: [
        UserModule,
    ],
    providers: [],
    exports: [
        UserModule,
    ],
})
export class SharedModule {}
