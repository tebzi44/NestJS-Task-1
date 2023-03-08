import { Body, Controller, Delete, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private userService: UserService) {}

    @Get()
    getAllUser():Promise<User[]>{
        return this.userService.getAllUser()
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('change-password')
    changePassword(@Request() req: any, @Body('password') password:string):Promise<string> {
        return this.userService.changePassword(req, password)
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete-user')
    deleteUser(@Request() req: any):Promise<string> {
        return this.userService.deleteUser(req)
    }

}
