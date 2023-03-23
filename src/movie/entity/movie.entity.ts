import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Actor } from "./actor.entity";
import { Director } from "./director.entity";
import { Genre } from "./genre.entity";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({
        type: 'date',
    })
    release_date: Date

    @Column()
    runtime: number

    @OneToMany(() => Genre, (genre) => genre.movie)
    @JoinTable()
    genre: Genre[];

    @OneToMany(() => Actor, (actor) => actor.movie)
    @JoinTable()
    actor: Actor[];

    @OneToMany(() => Director, (director) => director.movie )
    @JoinTable()
    director: Director[];
}