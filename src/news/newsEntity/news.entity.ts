import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm'


@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    userId: number;
}