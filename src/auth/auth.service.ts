import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from "./dto/singup.dto";
import { JwtService } from '@nestjs/jwt/dist';
import { Repository } from 'typeorm';
import { User } from "src/user/entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private jwtService: JwtService
        ) {}

    async signup( signupDto: SignupDto):Promise<User> {  
        const newUser = this.userRepository.create({...signupDto})
        return await this.userRepository.save(newUser)
    }

    // async signin(email: string, password: string) {
    //     const user = await this.userRepository.findOne({where: {email}});
    //     if (!user) throw new NotFoundException();
    //     if(user.password !== password) throw new NotFoundException('incorrect password');
        
    //     return this.signUser(user.id, user.email);
    // }

    signUser(id: Object, email: string) {
        return this.jwtService.sign({
            id,
            email
        })
    }
}