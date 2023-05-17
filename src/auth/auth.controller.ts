import { Controller, NotFoundException } from "@nestjs/common";
import { Body, Post } from "@nestjs/common/decorators";
import { User } from "src/modules/user/entity/user.entity";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/singup.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() signupDto: SignupDto):Promise<User> {
        // Promise<User>
        console.log(signupDto);

        return this.authService.signup(signupDto)
    }

    @Post('signin')
    signin(@Body('email') email:string, @Body('password') password:string):Promise<any> {
        if(!email || ! password) throw new NotFoundException('Filled in all fields!');
        
        return this.authService.signin(email, password)
    }
}
