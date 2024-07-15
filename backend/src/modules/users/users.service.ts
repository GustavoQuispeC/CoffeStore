import { Injectable, NotFoundException, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/modules/users/users.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async signUp(userDTO: UserDTO): Promise<User> {
    const { email } = userDTO;

    const existingUser = await this.userRepository.findOne({
        where: { email },
    });
    if (existingUser) {
        throw new ConflictException('El usuario ya existe');
    }

    const newUser = this.userRepository.create(userDTO);
    return await this.userRepository.save(newUser);
    }

    async signIn(email: string, password: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
        throw new NotFoundException('Usuario no encontrado');
    }

    if (user.password && user.password === password) {
        return user;
    }

    if (!user.password) {
        return user;
    }

    throw new NotFoundException('Credenciales inválidas');
    }

    async getUserById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
    }

    async updateUser(id: string, userDTO: Partial<UserDTO>): Promise<User | undefined> {
    await this.userRepository.update(id, userDTO);
    return await this.userRepository.findOne({ where: { id } });
    }

    async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }
}
