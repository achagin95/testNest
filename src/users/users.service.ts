import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}})
        return user
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findByPk(id)
        return user
    }

    async getUser() {
        try {
            // console.log(request)
            // const authHeader = request.headers.authorization
            // const bearer = authHeader.split(' ')[0]
            // const token = authHeader.split(' ')[1]
        } catch (error) {
            
        }
    }
}
