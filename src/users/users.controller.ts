import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'create user'})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("user")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }
}

//@UseGuards(JwtAuthGuard)