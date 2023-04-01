import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entity/actor.entity';
import { Director } from './entity/director.entity';
import { Genre } from './entity/genre.entity';
import { Movie } from './entity/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor, Director, Genre])],
  controllers: [MovieController],
  providers: [MovieService,JwtStrategy]
})
export class MovieModule {}
