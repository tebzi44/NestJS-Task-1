import { Controller } from "@nestjs/common";
import { Body, Post } from "@nestjs/common/decorators";
import { User } from "src/user/entity/user.entity";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/singup.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() signupDto: SignupDto):Promise<User> {
        return this.authService.signup(signupDto)
    }

    @Post('signin')
    signin(@Body('email') email:string, @Body('password') password:string) {
        return this.authService.signin(email, password)
    }
}
