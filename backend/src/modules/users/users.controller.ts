import {Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { UserDTO } from 'src/modules/users/users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

@Post('signup')
async signUp(@Body() userDTO: UserDTO): Promise<User> {
    return await this.usersService.signUp(userDTO);
}

@Post('signin')
async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
) {
    return await this.usersService.signIn(email, password);
}

@Get(':id')
async getUserById(@Param('id') id: string): Promise<User | undefined> {
    return await this.usersService.getUserById(id);
}

@Put(':id')
async updateUser(
    @Param('id') id: string,
    @Body() userDTO: Partial<UserDTO>,
): Promise<User | undefined> {
    return await this.usersService.updateUser(id, userDTO);
}

@Delete(':id')
async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
    }
}
