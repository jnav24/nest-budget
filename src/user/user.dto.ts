import {IsEmail, IsString, Length} from 'class-validator';

export class UserDto {
    @IsEmail()
    readonly username: string;

    @IsString()
    @Length(8, 24)
    readonly password: string;
}
