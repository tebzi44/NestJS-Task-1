import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/entity/movie.entity';
import { Actor } from './movie/entity/actor.entity';
import { Genre } from './movie/entity/genre.entity';
import { Director } from './movie/entity/director.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'gresi124',
      database: 'movies_web',
      entities: [User, Movie, Actor, Genre, Director],
      synchronize: true,
    }),
    MovieModule,
  ],
})
export class AppModule {}
