import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        try {
            if (!request.headers.authorization) {
                throw new UnauthorizedException({ message: 'Unauthorized user' })
            }
            const authHeader = request.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Unauthorized user' })
            }

            // const decoded: any = this.jwtService.decode(token)
            // if (decoded.role !== 'admin') {
            //     throw new UnauthorizedException({message: 'not enough rights'})
            // }

            const user = this.jwtService.verify(token)
            if (user.role !== 'admin') {
                throw new UnauthorizedException({ message: 'not enough rights' })
            }
            request.user = user
            return true

        } catch (error) {
            console.log(error)
            throw new UnauthorizedException({ message: error.response.message })
        }
    }

}