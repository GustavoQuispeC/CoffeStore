import { ChildEntity, Column } from "typeorm";
import { Users } from "./users.entity";

@ChildEntity()
export class UsersInternal extends Users {
    @Column()
    password: string;

    @Column()
    phone: number;
}