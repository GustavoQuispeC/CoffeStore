import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "src/enum/roles.enum";
export class UserDTO {
@IsOptional()
name: string;

@IsNotEmpty()
@IsEmail()
email: string;

@IsOptional()
@IsEnum(Role)
role: Role;

@IsOptional()
password?: string;

@IsOptional()
phone?: string;
}
