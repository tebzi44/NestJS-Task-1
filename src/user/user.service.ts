import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
// import { CreatUserDto } from "./dto/create-user.dto";
import { User } from "./interface/user.interface";

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private userModel: Model<User> ){}

    async getAllUser():Promise<User[]> {
        return this.userModel.find()
    }

    async changePassword(id: string, password: string):Promise<string> {
        await this.userModel.findByIdAndUpdate(id, { password })
        return  'updated succesfully'
    }
}