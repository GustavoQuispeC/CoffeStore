import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,) {}

        async usersFindAll(): Promise<Users[]> {
            try {
                return await this.usersRepository.find();
            } catch (error) {
                throw new Error(`Error while fetching users: ${error.message}`);
            }
            
        }

        async userFindOne(id: string): Promise<Users | undefined> {
            try {
                return await this.usersRepository.findOne({ where: { id } });
            } catch (error) {
                throw new NotFoundException(`User with ID ${id} not found`)
            }
        }

        async createUser(user: Users): Promise<Users> {
            try {
                return await this.usersRepository.save(user);
            } catch (error) {
                throw new Error(`Error while creating user: ${error.message}`);
            }
        }

        async updateUser(id: string, update: Partial<Users>): Promise<Users>{
            try {
                await this.usersRepository.update(id, update);
                return await this.usersRepository.findOne({ where: { id } })
            } catch (error) {
                throw new Error(`Error while updating user: ${error.message}`);
            }
            
        }

        async deleteUsers(id: string): Promise<void> {
            try {
                const result = await this.usersRepository.delete(id)
                if(result.affected === 0) {
                    throw new NotFoundException(`User with ID ${id} not found`)
                }
            } catch (error) {
                throw new Error(`Error while deleting user: ${error.message}`)
            }
            
        }
}