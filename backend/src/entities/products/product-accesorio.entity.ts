import { ChildEntity, Column } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity()
export class Accesorio extends Product{
    @Column()
    ok_accesorio:boolean
}

