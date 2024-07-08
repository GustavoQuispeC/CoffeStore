import { ChildEntity } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity({name:"chocolates"})
export class Chocolate extends Product{

}