import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    
    @ApiProperty({example: 'qwe@mail.ru', description: 'email'})
    readonly email: string

    @ApiProperty({example: '12345qwe', description: 'password'})
    readonly password: string
}