import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { genderEnum, roleEnum } from 'src/modules/user/entity/user.entity';

export class SignupDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    firstname: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(30)
    password: string;

    @IsEnum(genderEnum)
    gender: genderEnum;

    @IsDate()
    @Type(() => Date)
    birthday: Date
    
    // @IsEnum(roleEnum)
    // role: roleEnum
}