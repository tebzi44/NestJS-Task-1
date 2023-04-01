import { Body, Controller, Get, Post, Patch, Delete, Query, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AddGenre } from './dto/addGenre.dto';
import { AddMovieDto } from './dto/addMovie.dto';
import { Genre } from './entity/genre.entity';
import { MovieService } from './movie.service';
import { extname } from 'path';
import { Movie } from './entity/movie.entity';

@Controller('movie')
export class MovieController {
    constructor( private movieService: MovieService) {}

    // MOVIE
    @Get()
    getAllMovie(){
        return this.movieService.getAllMovie()
    }

    @Post('add-movie')
    async addMovie(@Body() addMovieDto: AddMovieDto ):Promise<any> {

        return await this.movieService.addMovie(addMovieDto)
    }


    @Patch('upload-poster/:id')
    @UseInterceptors(FileInterceptor('poster', { 
        storage: diskStorage({
          destination:'./files',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + Math.round(Math.random())
            const ext = extname(file.originalname)
            const filename = `${uniqueSuffix}${ext}`
            callback(null, filename)
          }
        })
      }),)

    async uploadPoster(
            @UploadedFile() poster: Express.Multer.File, 
            @Param('id') id:number
        ):Promise<Movie> {
        const posterURL = poster.path
        return this.movieService.uploadPoster(posterURL,id)
    }


    
    // GENRE
    @Post('add-genre')
    addGenre( @Body() addGenre: AddGenre ):Promise<Genre> {
        return this.movieService.addGenre(addGenre)
    }

    @Get('genres')
    Genres():Promise<Genre[]> {
        return this.movieService.Genres()
    }

    @Delete('delete-genre')
    deleteGenre(@Query('id') id: number):Promise<any> {
        return this.movieService.deleteGenre(id)
    }

}
