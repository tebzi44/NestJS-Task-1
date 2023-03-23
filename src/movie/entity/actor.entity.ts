import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";


@Entity()
export class Actor {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({
        type: 'date',
    })
    birthday: Date

    @ManyToOne(() => Movie, (movie) => movie.actor)
    movie: Movie[]
}