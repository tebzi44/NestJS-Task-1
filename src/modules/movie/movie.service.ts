import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddGenre } from './dto/addGenre.dto';
import { AddMovieDto } from './dto/addMovie.dto';
import { Actor } from './entity/actor.entity';
import { Director } from './entity/director.entity';
import { Genre } from './entity/genre.entity';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {
    // private readonly relations = ["genre"]

    constructor( 
        @InjectRepository(Movie) private movieRepository: Repository<Movie>,
        @InjectRepository(Actor) private actorRepository: Repository<Actor>,
        @InjectRepository(Genre) private genreRepository: Repository<Genre>,
        @InjectRepository(Director) private directorRepository: Repository<Director>,
    ) {}
    
    

    async getAllMovie():Promise<Movie[]> {
        const result = await this.movieRepository.find({
            // relations: this.relations
            relations:['genre', 'actor', 'director']
        })
        
        return result
    }

    //
    async dataFetcher (dataName:number[], dataRepository:Repository<any>) {
        const data = await Promise.all(
            dataName.map(async(id:number) => await dataRepository.findOneBy({id}))
            );
            return data
        }

    async addMovie(addMovieDto: AddMovieDto):Promise<any> {
        const { title, release_date, runtime, genre, actor, director } = addMovieDto
        
        let genres = await this.dataFetcher(genre, this.genreRepository)
        let actors = await this.dataFetcher(actor, this.actorRepository)
        let directors = await this.dataFetcher(director, this.directorRepository)
        
        const movie = this.movieRepository.create({
            title,
            release_date,
            runtime,
            genre: genres,
            actor: actors,
            director: directors
        })
        return await this.movieRepository.save(movie)
    }

    async uploadPoster(posterURL: string, id: number):Promise<Movie> {
        const addPosterURL= await this.movieRepository.findOneBy({id})
        addPosterURL.posterURL = posterURL
        return this.movieRepository.save(addPosterURL)        
    }

    async Genres():Promise<Genre[]> {
        return await this.genreRepository.find()
    }

    async addGenre(addGenre: AddGenre):Promise<any> {
        const newGenre =  this.genreRepository.create({...addGenre})
        console.log(newGenre);
        return this.genreRepository.save(newGenre)
    }

    async deleteGenre(id: number):Promise<any> {
        return await this.genreRepository.delete(id)
    }
}









//     const genreFromDatabase = await Promise.all(
        //          genre.map(async(id:number) => {
        //             const result = await this.genreRepository.findOneBy({id})
        //             return result
        //         })
        //     );
        //     const directorFromDatabase = await Promise.all(
        //         director.map(async(id:number) => {
        //            const result = await this.directorRepository.findOneBy({id})
        //            return result
        //        })
        //    );
        //    const actorFromDatabase = await Promise.all(
        //     director.map(async(id:number) => {
        //        const result = await this.actorRepository.findOneBy({id})
        //        return result
        //    })
        //    ); 
           
           
            // const directorFromDatabase = await this.directorRepository.findOneBy({id: director})
            // const actorFromDatabase = await this.actorRepository.findOneBy({id: actor})