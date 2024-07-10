import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id:string

    @Column({default:"tienda"})
    adressDelivery:string

    @Column()
    totalPrice: number

    @Column({default:0})
    cupoDescuento: number

    @OneToOne(()=>Order,(order)=>order.orderDetail)
    @JoinColumn({name:'orderId'})
    order:  Order
}