import { Injectable, NotFoundException, ConflictException, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/modules/users/users.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

    async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) throw new BadRequestException('Invalid credentials');


    let userRoles: Role[]

    const payload = { 
        email: user.email, 
        sub: user.id, 
        roles: userRoles
    }
    const accessToken = this.jwtService.sign(payload);

    return { success : 'User logged in successfully', accessToken}
    // if (user.password && user.password === password) return user;

    // if (!user.password) return user;

    // throw new NotFoundException('Credenciales inválidas');
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
