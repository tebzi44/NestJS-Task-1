import { Body, Controller, Delete, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminRoleGuard } from 'src/admin-role.guard';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor( private userService: UserService) {}

    @UseGuards(AdminRoleGuard)
    @Get()
    getAllUser():Promise<User[]>{
        return this.userService.getAllUser()
    }

    @Patch('update-password')
    changePassword(@Request() req: any, @Body('password') password:string):Promise<string> {
        return this.userService.updatePassword(req, password)
    }
    
    @Delete('delete-user')
    deleteUser(@Request() req: any):Promise<string> {
        return this.userService.deleteUser(req)
    }

}
