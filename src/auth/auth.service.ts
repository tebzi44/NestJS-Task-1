import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User } from "src/user/interface/user.interface";
import { SignupDto } from "./dto/singup.dto";
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('user') 
        private userModel:Model<User>,
        private jwtService: JwtService
        ) {}

    async signup( signupDto: SignupDto):Promise<User> {
        const { name, email, password } = signupDto
        return await this.userModel.create({
            name,
            email,
            password
        })
    }

    async signin(email: string, password: string) {
        const user = await this.userModel.findOne({email});
        if (!user) throw new NotFoundException()
        if(user.password !== password) throw new NotFoundException('incorrect password')
        
        return this.signUser(user._id, user.email)
    }

    signUser(userId: Object, email: string) {
        return this.jwtService.sign({
            userId,
            email
        })
    }
}