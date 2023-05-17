import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ads {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column({nullable: true})
    adsURL: string;

    @Column({ 
        type: 'date', 
    })
    expirationDate: Date;
}