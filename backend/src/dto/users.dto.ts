import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "src/enum/roles.enum";
// import { UsersExternal } from "src/entities/users-external.entity";
// import { UsersInternal } from "src/entities/users-internal.entity";
// import { Users } from "src/entities/users.entity";
// import { Role } from "src/enum/roles.enum";

// export class UserDTO {
//     @IsNotEmpty()
//     name: string;
  
//     @IsNotEmpty()
//     @IsEmail()
//     email: string;
  
//     @IsEnum(Role)
//     role: Role;
  
//     @IsNotEmpty()
//     isAvailable: boolean;
  
//     @IsNotEmpty()
//     isDeleted: boolean;
  
//     password?: string;
    
//     phone?: number;

//     static fromEntity(entity: Users | UsersExternal | UsersInternal): UserDTO {
//         const dto = new UserDTO();
//         dto.name = entity.name;
//         dto.email = entity.email;
//         dto.role = entity.role;
//         dto.isAvailable = entity.isAvailable;
//         dto.isDeleted = entity.isDeleted;
    

//         if (entity instanceof UsersInternal) {
//             dto.password = entity.password;
//             dto.phone = entity.phone;
//         }
    
//         return dto;
//     }

// }




export class UserDTO {
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  password?: string;

  @IsOptional()
  phone?: string;
}
