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

    async changePassword(req: any, password: string):Promise<string> {
        const { id }= req.user
        const newPassword =  await this.userRepository.findOneBy({id});
        newPassword.password = password;
        await this.userRepository.save(newPassword)
        return  'updated succesfully'
    }

    async deleteUser(req: any):Promise<string> {
        const { id }= req.user
        await this.userRepository.delete({ id })
        
        return 'deleted succesfully' 
    }
}