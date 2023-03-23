import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor( private movieService: MovieService) {}

    @Get()
    getAllMovie(){
        return this.movieService.getAllMovie()
    }

}
