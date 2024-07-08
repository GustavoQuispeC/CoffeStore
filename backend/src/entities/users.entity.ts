import { Role } from "src/enum/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity({ name: 'users' })
@TableInheritance({column: { type: "varchar", name: "type"}})
export abstract class Users {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    @Column({default: true})
    isAvailable: boolean;

    @Column({default: false})
    isDeleted: boolean;


}