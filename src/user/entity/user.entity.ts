import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

export enum isActiveEnum {
    TRUE = 'true',
    FALSE = 'false'
}

export enum genderEnum {
    FEMALE = 'female',
    MALE = 'male'
}

export enum roleEnum {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: genderEnum
    })
    gender: genderEnum

    @Column({
        type: 'date',
    })
    birthday: Date

    @Column({
        type: 'enum',
        enum: roleEnum,
        default: roleEnum.USER
    })
    role: roleEnum

    @Column({
        type: 'enum',
        enum: isActiveEnum,
        default: isActiveEnum.TRUE
    })
    isActive: isActiveEnum;
}