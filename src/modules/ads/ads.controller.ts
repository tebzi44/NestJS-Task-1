import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdsService } from './ads.service';
import { Ads } from './entity/ads.entity';
import { FileInterceptor } from '@nestjs/platform-express';
const fs = require('fs');
// const sizeOf = require('image-size')
// const multer = require('multer')
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { error } from 'console';

@Controller('ads')
export class AdsController {
    constructor( private readonly adsService: AdsService) {}

    @Get()
    allAds():Promise<Ads[]> {
        return this.adsService.allAds()
    }

    @Post()
    createAds(@Body('link') link: string ):Promise<Ads> {

        return this.adsService.createAds(link)
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile('file') file: Express.Multer.File, @Param('id') id: number ) {
        
        return this.adsService.uploadImage( file, id )
    }


    @Delete(':id')
    deleteAds(@Param('id', ParseIntPipe) id: number) {
        return this.adsService.deleteAds(id)
    }

    @Get('image/:id')
    async getAdsImage(@Param('id', ParseIntPipe) id: number, @Res() res: any):Promise <any> {

        return await this.adsService.getAdsImage(id, res)
    }

    // @Get('hello')
    // fix() {
    //     return this.adsService.fix()
    // }
}








// {
//     storage: diskStorage({
//         destination: './files/adsImages',
//         filename: (req, file, callback) => {
//             const uniqueSuffix = Date.now() + Math.round(Math.random())
//             const ext = extname(file.originalname)
//             const filename = `${file.originalname}-${uniqueSuffix}${ext}`
//             callback(null, filename)
//           }
//     }),
//     fileFilter: (req, file, cd)=> {
//         console.log(file);           
//         // const size = sizeOf(file)
//         // console.log(file);
//         return cd(null, true) 
//     }
// }))

// const storage = diskStorage({
//             destination: (req, file, cb) => {
//                 cb(null, './files/');
//             },
//             filename: (req, file, cb) => {
//                 cb(null, file.originalname);
//             },
//         });
        
        // const uploadMiddleware = await multer({ storage });
        // console.log(uploadMiddleware)


        // const imagePath = file.path;
        // const dimensions = sizeOf()
        // // Validate image resolution
        // const minWidth = 800; // minimum width requirement
        // const minHeight = 600; // minimum height requirement

        // if (dimensions.width < minWidth || dimensions.height < minHeight) {
        //     // If image resolution is too low, throw an error
        //     throw new Error('Image resolution is too low');

        // }