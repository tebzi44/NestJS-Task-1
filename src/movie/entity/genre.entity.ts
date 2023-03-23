import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Movie } from './movie.entity'

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    genre_name: string

    @ManyToOne(() => Movie, (movie) => movie.genre)
    movie: Movie[]
}