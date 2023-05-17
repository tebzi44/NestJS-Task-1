import { Injectable } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User> ){}
    
    async getAllUser():Promise<User[]> {
        return this.userRepository.find()
    }

    async updatePassword(req: any, password: string):Promise<string> {
        const { id }= req.user
        const user =  await this.userRepository.findOneBy({id});
        user.password = password;
        await this.userRepository.save(user)
        return  'updated succesfully'
    }

    async deleteUser(req: any):Promise<string> {
        const { id }= req.user
        await this.userRepository.delete({ id })
        
        return 'deleted succesfully' 
    }
}