import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersExternal } from "src/entities/users-external.entity";
import { UsersInternal } from "src/entities/users-internal.entity";
import { Users } from "src/entities/users.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users, UsersExternal, UsersInternal]),
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})

export class UsersModule {}