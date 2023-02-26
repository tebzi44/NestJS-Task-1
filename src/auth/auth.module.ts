import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({secret:'hamilton44', signOptions: { expiresIn: '15min' }})
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
