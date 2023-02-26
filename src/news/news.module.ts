import { Module } from "@nestjs/common/decorators";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { News } from "./newsEntity/news.entity";
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from "src/auth/strategy/jwt.strategy";


@Module({
    imports: [TypeOrmModule.forFeature([News])],
    controllers: [NewsController],
    providers: [NewsService, JwtStrategy]
})

export class NewsModule {}