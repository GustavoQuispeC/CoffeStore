import { ChildEntity, Column } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity()
export class Coffee extends Product{
    @Column()
    ok_coffee:boolean
}