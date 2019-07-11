import {Module} from '@nestjs/common';
import {UserModule} from '../user/user.module';
import {ConfigModule} from '../config/config.module';

@Module({
    imports: [
        ConfigModule,
        UserModule,
    ],
    providers: [],
    exports: [
        ConfigModule,
        UserModule,
    ],
})
export class SharedModule {}
