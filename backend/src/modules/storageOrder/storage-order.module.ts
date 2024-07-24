import { Module } from '@nestjs/common';
import { StorageOrderController } from './storage-order.controller';
import { StorageOrderService } from './storage-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from 'src/entities/storage.entity';
import { Product } from 'src/entities/products/product.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Storage,Product,User])],
  controllers: [StorageOrderController],
  providers: [StorageOrderService],
  exports:[StorageOrderService]
})
export class StorageOrderModule {


}
