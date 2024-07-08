import { ChildEntity } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity({name:"tes"})
export class Mate extends Product{

}