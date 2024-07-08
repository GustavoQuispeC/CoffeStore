import { ChildEntity } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity({name:"mates"})
export class Te extends Product{

}

