import { Body, Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { AddGenre } from './dto/addGenre.dto';
import { AddMovieDto } from './dto/addMovie.dto';
import { Genre } from './entity/genre.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor( private movieService: MovieService) {}

    @Get()
    getAllMovie(){
        return this.movieService.getAllMovie()
    }

    @Post('add-movie')
    async addMovie( @Body() addMovieDto: AddMovieDto ):Promise<any> {
        return await this.movieService.addMovie(addMovieDto)
    }

    @Post('add-genre')
    addGenre( @Body() addGenre: AddGenre ):Promise<Genre> {
        return this.movieService.addGenre(addGenre)
    }

    @Delete('delete-genre')
    deleteGenre(@Query('id') id: number):Promise<any> {
        return this.movieService.deleteGenre(id)
    }

    @Get('genres')
    Genres():Promise<Genre[]> {
        return this.movieService.Genres()
    }

    

}
