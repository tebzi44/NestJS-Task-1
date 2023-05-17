import { User } from "src/modules/user/entity/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class JwtToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToOne(() => User, user => user.jwtToken)
  user: User;
}





