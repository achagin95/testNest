import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private jwtServuse: JwtService) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }

    async getUserById(id: number, token: string) {
        try {
            const jwt = token.split(' ')[1]
            const userWhoReq = this.jwtServuse.verify(jwt)
            if (userWhoReq.id !== Number(id) && userWhoReq.role !== "admin") {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
            }
            const user = await this.userRepository.findByPk(id)
            if (!user) {
                throw new HttpException('not found', HttpStatus.NOT_FOUND)
            }
            return user
        } catch (error) {
            throw error
        }
    }

    async deleteUserById(id: number, token: string) {
        try {
            const jwt = token.split(' ')[1]
            const userWhoReq = this.jwtServuse.verify(jwt)
            if (userWhoReq.id !== Number(id) && userWhoReq.role !== "admin") {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
            }
            const user = await this.userRepository.findByPk(id)
            if (!user) {
                throw new HttpException('not found', HttpStatus.NOT_FOUND)
            }
            await user.destroy()
            return "deleted"
        } catch (error) {
            throw error
        }
    }

    async updateUserById(dto: UpdateUserDto, id: string, token: string) {
        try {
            const checkRoles = ['user', 'admin']
            let hashPassword: string
            const jwt = token.split(' ')[1]
            const userWhoReq = this.jwtServuse.verify(jwt)
            if (userWhoReq.id !== Number(id) && userWhoReq.role !== "admin") {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
            }
            if (dto.admin === 'admin' && userWhoReq.role === "user") {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
            }
            if (!checkRoles.includes(dto.admin)) {
                console.log(checkRoles.includes(dto.admin))
                throw new HttpException('Bad Role', HttpStatus.NOT_FOUND)
            }
            const user = await this.userRepository.findByPk(id)
            if (!user) {
                throw new HttpException('not found', HttpStatus.NOT_FOUND)
            }
            if (dto.password.length === 0) {
                hashPassword = user.password
            } else {
                hashPassword = await bcrypt.hash(dto.password, 7)
            }
            if (dto.email.length === 0) {
                dto.email = user.email
            }
            if (dto.admin.length === 0) {
                dto.admin = user.admin
            }
            await user.update({
                email: dto.email,
                password: hashPassword,
                admin: dto.admin
            })
            return user
        } catch (error) {
            throw error
        }
    }

    async getAdminRole(id: string) {
        try {
            const user = await this.userRepository.findByPk(id)
            if (!user) {
                throw new HttpException('not found', HttpStatus.NOT_FOUND)
            }
            await user.update({
                admin: 'admin'
            })
            return user
        } catch (error) {
            throw error
        }

    }

}
