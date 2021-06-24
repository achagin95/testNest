import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Socket } from 'dgram';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
//import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesGuard2 } from 'src/auth/roles.guard2';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'create user'})
    @ApiResponse({status: 201, type: User})
    @Roles('admin')
    @UseGuards(RolesGuard2)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(RolesGuard2)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'get User info (user, why did request)'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard2)
    @Get('/getinfo')
    getUserInfo(soket: Socket) {
        return this.userService.getUser()
    }

    @ApiOperation({summary: 'get User info by id'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(RolesGuard2)
    @Get('/getinfo/:id')
    getUserInfoById(@Param('id') id) {
        return this.userService.getUserById(id)
    }
}
