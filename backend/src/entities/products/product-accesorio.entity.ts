import { ChildEntity } from "typeorm";
import { Product } from "./product.entity";

@ChildEntity({name:"accesorios"})
export class Accesorio extends Product{

}

