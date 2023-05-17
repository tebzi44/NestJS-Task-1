import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ads } from './entity/ads.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ads]),
    ScheduleModule.forRoot()
  ],
  controllers: [AdsController],
  providers: [AdsService]
})
export class AdsModule {}
