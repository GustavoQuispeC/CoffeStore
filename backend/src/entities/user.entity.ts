import { Role } from "src/enum/roles.enum";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type:'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: false })
  isDeleted: boolean;
}
