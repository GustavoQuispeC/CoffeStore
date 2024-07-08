import { ChildEntity,Column } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity()
export class Mate extends Product{
    @Column()
    ok_mate:boolean
}