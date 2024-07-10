import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./products/product.entity";
import { Order } from "./order.entity";

@Entity()
export class ProductOrder{

    @PrimaryGeneratedColumn()
    id:string

    @Column()
    cantidad: number

    @ManyToOne(()=>Product,(product)=>product.productsOrder)
    product: Product

    @ManyToOne(()=>Order,(order)=>order.productsOrder)
    order: Order
}