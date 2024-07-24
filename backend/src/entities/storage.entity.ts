import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./products/product.entity";
import { User } from "./user.entity";

@Entity({
    name: 'storage'
})
export class Storage {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(()=>User,(user)=>user.storage)
    user:User

    @ManyToOne(()=>Product,(product)=>product.storage)
    product:Product

    @Column()
    quantity: number
}