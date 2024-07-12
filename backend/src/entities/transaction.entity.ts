import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderdetail.entity";
import { OrderStatus } from "src/enum/orderStatus.enum";

@Entity({name:'transacciones'})
export class Transaccion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'enum', enum: OrderStatus, nullable: false})
    status: OrderStatus;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    timestamp:Date;

    @ManyToOne(() => OrderDetail, (orderdetail) => orderdetail.transactions)
    @JoinColumn({name: 'orderdetailsId'})
    orderdetail: OrderDetail
}