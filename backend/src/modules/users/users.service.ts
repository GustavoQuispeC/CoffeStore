import { Injectable, NotFoundException, ConflictException, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enum/roles.enum';
import { UserDTO } from './users.dto';
import { timeStamp } from 'console';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    ) {}

    async signUp(userDTO: UserDTO): Promise<User> {
    const { email, password } = userDTO;

    const existingUser = await this.userRepository.findOne({
        where: { email },
    });
    if (existingUser) {
        throw new ConflictException('El usuario ya existe');
    }

    let newUser: User;

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) throw new BadRequestException('Error hashing password');
        newUser = await this.userRepository.create({...userDTO, password: hashedPassword});
    } else {
        newUser = await this.userRepository.create(userDTO);
    }

    newUser.role = Role.USER;

    return await this.userRepository.save(newUser);
    
}

    async signIn(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new NotFoundException('Invalid credentials');
    let userRoles: Role[] = [user.role];
    
    if (!user) throw new NotFoundException('Invalid credentials');

    if (!user.password) {
        const payload = {
            name: user.name, 
            email: user.email,
            password: user.password,
            phone: user.phone, 
            sub: user.id,
            roles: userRoles,
            isAvailable: user.isAvailable,
            isDeleted: user.isDeleted  
        };

        console.log(payload);

        const accessToken = this.jwtService.sign(payload);

        return { success: 'External user logged in successfully', accessToken };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    

    const payload = { 
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone, 
        sub: user.id, 
        roles: userRoles,
        isAvailable: user.isAvailable,
        isDeleted: user.isDeleted

    }

    console.log(payload);
    
    const accessToken = this.jwtService.sign(payload);

    return { success : 'User logged in successfully', accessToken}
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
