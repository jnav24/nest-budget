import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';

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
            throw new BadRequestException(`Validation Failed: ${this.formatErrors(errors)}`);
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

    /**
     * Grabs all errors from the ValidationError and converts to a string
     *
     * @param {any[]} errors
     * @returns {string}
     */
    private formatErrors(errors: ValidationError[]): string {
        return errors.map((error) => {
            for (const constraint in error.constraints) {
                if (typeof error.constraints[constraint] !== 'undefined') {
                    return error.constraints[constraint];
                }
            }
        }).join(', ');
    }
}
