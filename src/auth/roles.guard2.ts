import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard2 implements CanActivate {

    constructor(private jwtService: JwtService,
        private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                return true
            }
            const request = context.switchToHttp().getRequest()
            const authHeader = request.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Unauthorized user'})
            }

            const user = this.jwtService.verify(token)
            request.user=user
            return requiredRoles.includes(user.role)

        } catch (error) {
            console.log(error)
            throw new UnauthorizedException({message: error.response.message})
        }
    }

}