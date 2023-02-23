import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private userService: UserService) {}

    @Get()
    getAllUser():Promise<User[]>{
        return this.userService.getAllUser()
    }


    @UseGuards(AuthGuard('jwt'))
    @Post(':id')
    changePassword(@Param('id') id: string, @Body('password') password:string):Promise<string> {
        return this.userService.changePassword(id, password)
    }

}
