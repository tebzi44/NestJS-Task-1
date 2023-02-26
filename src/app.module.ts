import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { News } from './news/newsEntity/news.entity';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    NewsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'gresi124',
      database: 'news',
      entities: [User, News],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
