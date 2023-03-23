import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from './entity/actor.entity';
import { Director } from './entity/director.entity';
import { Genre } from './entity/genre.entity';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {
    constructor( 
        @InjectRepository(Movie) private movieRepository: Repository<Movie>,
        // @InjectRepository(Actor) private actorRepository: Repository<Actor>,
        // @InjectRepository(Genre) private genreRepository: Repository<Genre>,
        // @InjectRepository(Director) private directorRepository: Repository<Director>
    ) {}

        async getAllMovie():Promise<Movie[]> {
            return await this.movieRepository.find({
                relations:['genre', 'actor', 'director']
            })
        }

}
