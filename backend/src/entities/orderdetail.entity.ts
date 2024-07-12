import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Transaccion } from "./transaction.entity";

@Entity({name:'orderdetails'})
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

    @OneToMany(()=>Transaccion,(transaccion)=> transaccion.orderdetail)
    transactions : Transaccion[]
}