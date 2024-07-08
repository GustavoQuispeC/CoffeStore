import { ChildEntity } from "typeorm";
import { Users } from "./users.entity";

@ChildEntity()
export class UsersExternal extends Users {}