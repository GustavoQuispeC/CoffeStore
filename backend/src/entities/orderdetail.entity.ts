import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Transaccion } from "./transaction.entity";

@Entity({name:'orderdetails'})
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id:string

    @Column({default:"tienda"})
    adressDelivery:string

    @Column({type: 'timestamp'})
    deliveryDate:Date

    @Column()
    totalPrice: number

    @Column({default:0})
    cupoDescuento: number

    @OneToOne(()=>Order,(order)=>order.orderDetail)
    @JoinColumn({name:'orderId'})
    order:  Order

    @OneToMany(()=>Transaccion,(transaccion)=> transaccion.orderdetail)
    transactions : Transaccion[]

    @BeforeInsert()
    setDefaultEventDate() {
            const currentDate = new Date();
            this.deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        }
    }
