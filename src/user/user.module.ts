import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UserModule {}
