import { CanActivate, ExecutionContext } from "@nestjs/common";
// import { Observable } from "rxjs";


export class AdminRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()

        if(request?.user.role === 'admin') {
            console.log(request.user);
            return true
        }
        return false
    }
}