import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products/product.entity';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { OrderDetail } from 'src/entities/orderdetail.entity';
import { ProductOrder } from 'src/entities/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Order,User,OrderDetail,ProductOrder])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
