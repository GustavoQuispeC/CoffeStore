import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "src/entities/users.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    usersFindAll(): Promise<Users[]>{
        return this.usersService.usersFindAll();
    }

    @Get()
    userFindOne(@Param('id') id: string): Promise<Users | undefined> {
        return this.usersService.userFindOne(id);
    }

    @Post()
    createUser(@Body() user: Users): Promise<Users> {
        return this.usersService.createUser(user);
    }

    @Put(':id')
    updateUser(@Param('id') id:string, @Body() update: Partial<Users>): Promise<Users | undefined> {
        return this.usersService.updateUser(id, update);
    }

    @Delete(':id')
    deleteUsers(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUsers(id);
    }

}