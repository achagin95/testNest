import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {
    
    @ApiProperty({example: 'qwe@mail.ru', description: 'email'})
    email: string

    @ApiProperty({example: '12345qwe', description: 'password'})
    password: string

    @ApiProperty({example: 'user', description: 'role'})
    admin: string
}