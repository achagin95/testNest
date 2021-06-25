import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) {

    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Duplicate email', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 7)
        const user = await this.userService.createUser({...userDto, password:hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {
            email: user.email, 
            id: user.id, 
            role: user.admin
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        console.log(userDto)
        const user = await this.userService.getUserByEmail(userDto.email)
        console.log(user)
        if(!user) {
            throw new HttpException("Uncorrect email", HttpStatus.NOT_FOUND)
        }
        const checkPassword = await bcrypt.compare(userDto.password, user.password)
        if (user && checkPassword) {
            return user
        }
        throw new UnauthorizedException( {message: "Uncorrect email or password"})
    }
}
