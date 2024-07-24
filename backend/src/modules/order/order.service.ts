import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderdetail.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductInfo } from './order.dto';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/products/product.entity';
import { ProductOrder } from 'src/entities/product-order.entity';
import { OrderQuery } from './orders.query';
import { Transaccion } from 'src/entities/transaction.entity';
import { OrderStatus } from 'src/enum/orderStatus.enum';


@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private readonly orderQuery: OrderQuery,
        private readonly dataSource: DataSource
    ){}

    async getAll(){
        return await this.orderQuery.getOrders()
    }

    async getById(id:string){
        
        const foundOrder = await this.orderQuery.getOrder(id);
        if(!foundOrder) throw new NotFoundException(`No se encontro order id: ${id}`)
        return foundOrder
    }

    async getByUserId(id:string){
        return await this.orderQuery.getByUserId(id)
    }

    async addOrder(userId:string, productsInfo:ProductInfo[],adress:undefined|string, cupoDescuento:undefined|number,deliveryDate:undefined|Date){
        
        let total = 0 ; 
        let createdOrder;
        //verifica existencia de usuario
        const user = await this.userRepository.findOneBy({id: userId,isDeleted:false})
        if(!user) throw new NotFoundException(`Usuario con id ${userId} no encontrado`)        
        if(!user.isAvailable) throw new ForbiddenException(`Usuario ${user.id} esta inhabilitado`) 
    
        //verifica existencia de productos y stock
        await Promise.all(
            productsInfo.map(async (element)=>{
                const product = await this.productRepository.findOneBy({id: element.id})
                if(!product) throw new NotFoundException(`Producto id ${element.id} no encontrado`) 
                if(product.stock<=0) throw new BadRequestException(`Producto id ${product.stock} fuera en stock`)
                
                return true    
                }))

        // iniciamos transaccion
        
        await this.dataSource.transaction(async (transactionalEntityManager)=>{

            const order = transactionalEntityManager.create(Order, { user, date: new Date() });
            const newOrder = await transactionalEntityManager.save(order)
            createdOrder = newOrder;

            await Promise.all(
                productsInfo.map(async (element)=>{
                        
                    this.updateStock(element.id)

                    const product = await transactionalEntityManager.findOneBy(Product, {id:element.id});
                    total += ((product.price*element.cantidad)*(1-product.discount))
                    
                    //asing to productsOrDER
                    const productOrder = transactionalEntityManager.create(ProductOrder,{
                        product,
                        order,
                        cantidad: element.cantidad
                    })
                    await transactionalEntityManager.save(ProductOrder,productOrder)
                    }

                ))
            
            if(cupoDescuento) total*=(1-cupoDescuento);
            const orderDetail = transactionalEntityManager.create(OrderDetail, {
                totalPrice: Number(total.toFixed(2)),
                order: newOrder,
                cupoDescuento:cupoDescuento? cupoDescuento:0,
                adressDelivery:adress? adress:"tienda",
                deliveryDate
            });
                    
            await transactionalEntityManager.save(OrderDetail, orderDetail);

            //agregamos estado

            await transactionalEntityManager.save(Transaccion,{
                status:OrderStatus.RECIBIDO,
                timestamp:new Date(),
                orderdetail: orderDetail
            })
        })

        return {
            message: `Se creo con exito orden ${createdOrder.id}`
            }
        }

    async deleteOrder(id:string){
        const foundOrder = await this.orderRepository.findOneBy({id})
        if(!foundOrder) throw new NotFoundException(`No se encontro order with id ${id}`)
        await this.orderRepository.update(id,{isDeleted:true})
    }
    
    async updateStock(idProduct:string){
        const product = await this.productRepository.findOne({ where: { id: idProduct } });
        await this.productRepository.update({ id: idProduct },{ stock: product.stock - 1 },
        );
        }
    }
