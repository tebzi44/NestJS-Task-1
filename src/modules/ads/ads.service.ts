import { Injectable, NotFoundException } from '@nestjs/common';
import { Ads } from './entity/ads.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, FindOperator, Repository } from 'typeorm';
import path from 'path';
import { Cron } from '@nestjs/schedule';
const sizeOf = require('image-size')
const fs = require('fs');




@Injectable()
export class AdsService {
    constructor(@InjectRepository(Ads) private adsRepository: Repository <Ads>) {}


    //find all ads
    async allAds():Promise<Ads[]> {   
        // const adsURL = ads.map(i => i.adsURL) 
        return await this.adsRepository.find()
    }

    //find one ads
    async findOneAds(id:number):Promise<Ads> {
        return await this.adsRepository.findOneBy({id})
    }

    //create ads
    async createAds(link: string):Promise<Ads> {
        const expirationDate = new Date(Date.now())
        
        const ads = this.adsRepository.create({ link, expirationDate }) 
        return await this.adsRepository.save(ads)
    }

    //delete ads
    async deleteAds(id: number) {
        const ads = (await this.findOneAds(id))
        const result = await this.adsRepository.delete({ id })
        if(result.affected === 0) throw new NotFoundException()
        if(ads.adsURL) {
            console.log(123);
            fs.unlink(ads.adsURL, err => {
                if (err) console.log(err);
                return 'deleted date and image'
            })
        }
        return 'deleted date'
    }

    //upload ads's image
    async uploadImage(file: Express.Multer.File, id:number) {
        const ads = await this.adsRepository.findOneBy({ id })
        if(!ads) throw new NotFoundException()

        let allowedExtensions = /(\image.jpg|\image.jpeg|\image.png|\image.gif)$/i;
        if(!allowedExtensions.exec(file.mimetype)) {
            return 'upload only image!';   
        }
        
        const size = sizeOf(file.buffer)
        const uniqueSuffix = Date.now() + Math.round(Math.random())
        if(size.height !== 600 || size.width !== 160 ) {
            return 'Image resolution is not suitable!';
        }
        if(file.size > 20000) {
            return 'Image is too big!';
        }
        const name = `./files/adsImage/image-${uniqueSuffix}-id-${id}.jpg`
        fs.writeFile(name, file.buffer, (err: any) => {
            if (err) throw err;
            console.log('Image saved successfully.');
        });
        
        ads.adsURL = name
        this.adsRepository.save(ads)
        return 'upload successfully'
    }

    //get ads image
    async getAdsImage(id: number, res: any ):Promise<any> {
        const ads = await this.adsRepository.findOneBy({id})
        if(ads === null) throw new NotFoundException()
        const adsURL = ads.adsURL
        const imagePath = adsURL;
        const imageStream = fs.createReadStream(imagePath);
        return imageStream.pipe(res)
    }

    @Cron('0 18 * * *')
    async handleCron() {
        console.log('hello from cron');
        
        const twoWeeksAgo = new Date(Date.now() - 12096e5).getTime()
        const AdsArray = await this.allAds()
        const expiredAds = AdsArray.filter(date => {
            return new Date(date.expirationDate).getTime() < twoWeeksAgo
        })
        expiredAds.forEach(async (ads: Ads) => {
            const id:number = ads.id
            fs.unlink(ads.adsURL, (err: any) => {
                if (err) console.log(err);
                return 'deleted date and image'
            })
            await this.adsRepository.delete({ id })
        })  
    }
}
