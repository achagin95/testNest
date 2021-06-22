import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
// import { AppController } from "./app.controller";
// import { AppService } from "./app.service";
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'test',
            database: 'testNest',
            models: [User],
            autoLoadModels: true,
        }),
        UsersModule,
    ],
})
export class AppModule { }