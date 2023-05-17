import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";



@Entity()
export class Director {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    firstname: string
    
    @Column()
    lastname: string
    
    @Column({
        type: 'date',
    })
    birthday: Date
    
    @ManyToMany(()=> Movie, (movie) => movie.director)
    movie: Movie[]
}