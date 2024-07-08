import { ChildEntity } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity({name:"endulzantes"})
export class Endulzante extends Product{

}