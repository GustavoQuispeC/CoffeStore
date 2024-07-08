import { ChildEntity } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity({name:"coffee"})
export class Coffee extends Product{

}