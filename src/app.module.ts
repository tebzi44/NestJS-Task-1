import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './modules/user/entity/user.entity';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { Movie } from './modules/movie/entity/movie.entity';
import { Actor } from './modules/movie/entity/actor.entity';
import { Genre } from './modules/movie/entity/genre.entity';
import { Director } from './modules/movie/entity/director.entity';
import { JwtToken } from './auth/entity/jwtToken.entity';
import { AdsModule } from './modules/ads/ads.module';
import { Ads } from './modules/ads/entity/ads.entity';

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
      entities: [User, Movie, Actor, Genre, Director, JwtToken, Ads],
      synchronize: true,
    }),
    MovieModule,
    AdsModule,
  ],
})
export class AppModule {}
