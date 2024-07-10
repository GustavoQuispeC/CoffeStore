import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductOrder } from "./product-order.entity";
import { OrderDetail } from "./orderdetail.entity";
import { User } from "./user.entity";

@Entity({name:'orders'})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'timestamp'})
    date: Date;
    
    @Column({default:false})
    isDeleted:boolean

    @ManyToOne(()=>User,(user) => user.orders )
    @JoinColumn({name:'userId'})
    user: User

    @OneToMany(()=>ProductOrder,(productOrder)=>productOrder.order)
    productsOrder: ProductOrder[]

    @OneToOne(()=>OrderDetail, (orderDetail)=>orderDetail.order)
    orderDetail: OrderDetail
}