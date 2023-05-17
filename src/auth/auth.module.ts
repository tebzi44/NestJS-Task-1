import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { JwtTokenService } from './jwtToken.service';
import { JwtToken } from './entity/jwtToken.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([User, JwtToken]),
        JwtModule.register({secret:'hamilton44', signOptions: { expiresIn: '1min' }})
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtTokenService]
})
export class AuthModule {}
