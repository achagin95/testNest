import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Socket } from 'dgram';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
//import { Roles } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesGuard2 } from 'src/auth/roles.guard2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'create user (only Admin)'})
    @ApiResponse({status: 201, type: User})
    @Roles('admin')
    @UseGuards(RolesGuard2)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'get all users (only Admin)'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(RolesGuard2)
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'get User info by id (only Admin can look anybody. User can look info only about himself)'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard2)
    @Get('/getinfo/:id')
    getUserInfoById(@Param('id') id, @Req() request: Request) {
        return this.userService.getUserById(id, request.headers.authorization)
    }

    @ApiOperation({summary: 'update User info by id (only Admin can update anybody. User can update info only about himself)'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard2)
    @Post('/updateInfo/:id')
    updateUserInfoById(@Body() userDto: UpdateUserDto,@Param('id') id, @Req() request: Request) {
        return this.userService.updateUserById(userDto, id, request.headers.authorization)
    }

    @ApiOperation({summary: 'delete User by id (only Admin can delete anybody. User can delete only himself)'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard2)
    @Delete('/deleteUser/:id')
    deleteUserInfoById(@Param('id') id, @Req() request: Request) {
        return this.userService.deleteUserById(id, request.headers.authorization)
    }

    @ApiOperation({summary: 'update User role to Admin for testing'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin', 'user')
    @UseGuards(RolesGuard2)
    @Post('/getAdminRole/:id')
    getAdminRole(@Param('id') id) {
        return this.userService.getAdminRole(id)
    }
}
