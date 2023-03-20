import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { genderEnum, roleEnum } from 'src/user/entity/user.entity';

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
    @IsStrongPassword()
    password: string;

    @IsEnum(genderEnum)
    gender: genderEnum;

    @IsDate()
    birthday: Date

    @IsEnum(roleEnum)
    role: roleEnum
}