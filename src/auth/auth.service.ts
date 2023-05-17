import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from "./dto/singup.dto";
import { JwtService } from '@nestjs/jwt/dist';
import { Repository } from 'typeorm';
import { User } from "src/modules/user/entity/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private jwtService: JwtService
        ) {}

    async signup( signupDto: SignupDto):Promise<User> {
        const { firstname, lastname, birthday, email, gender } = signupDto //role
        const saltOrRounds = 10;
        const password = signupDto.password;
        const hash = await bcrypt.hash(password, saltOrRounds); 

        const newUser = this.userRepository.create({
            firstname,
            lastname,
            birthday,
            email,
            gender,
            // role,
            password: hash
         })
        return await this.userRepository.save(newUser)
    }

    async signin(email: string, password: string) {
        const user = await this.userRepository.findOne({where: {email}});
        if (!user) throw new NotFoundException('User not found!');

        console.log(email, password);

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) throw new NotFoundException('incorrect password');
        return this.signUser(user.id, user.email, user.role);
    }

    signUser(id: number, email: string, role:string) {
        return this.jwtService.sign({
            id,
            email,
            role
        })
    }
}