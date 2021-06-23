import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttr {
    email: string
    password: string
}

@Table( {tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {

    @ApiProperty({example: 1, description: "unique id"})
    @Column( {type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true} )
    id: number
    
    @ApiProperty({example: "qwe@mail.ru", description: "unique email"})
    @Column( {type: DataType.STRING, unique:true, allowNull: false} )
    email: string

    @ApiProperty({example: '12345qwe', description: "password"})
    @Column( {type: DataType.STRING, allowNull: false} )
    password: string

    @ApiProperty({example: false, description: "admin role. I could make numbers (0-user, 1-admin)"})
    @Column( {type: DataType.STRING, defaultValue: "user"} )
    admin: string
}