import { Module } from '@nestjs/common';
import { UserSchema } from 'src/user/schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
        JwtModule.register({secret:'hamilton44', signOptions: { expiresIn: '15min' }})
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
