import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddMovieDto } from './dto/addMovie.dto';
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
    addGenre(@Body() ) {
        return
    }
    

}
