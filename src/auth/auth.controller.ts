import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization/Registration')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @ApiOperation({summary: 'login user'})
    @ApiResponse({status: 200, type: String})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'reg user'})
    @ApiResponse({status: 201, type: String})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

}
