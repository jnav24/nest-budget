import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (value instanceof Object && this.isEmpty(value)) {
            throw new BadRequestException('Validation Failed: Empty State');
        }

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const obj = plainToClass(metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            throw new BadRequestException('Validation Failed');
        }

        return value;
    }

    private toValidate(metatype): boolean {
        const types =  [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }

    private isEmpty(obj: { [key: string]: any }) {
        return !Object.keys(obj);
    }
}
