import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Movie } from './movie.entity'

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    genre_name: string

    @ManyToMany(() => Movie, (movie) => movie.genre)
    movie: Movie[]
}