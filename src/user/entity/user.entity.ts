import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

export enum isActiveEnum {
    TRUE = 'true',
    FALSE = 'false'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: isActiveEnum,
        default: isActiveEnum.TRUE
    })
    isActive: isActiveEnum;
}