import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { StorageOrderService } from './storage-order.service';

import { CreateOrderStorageDto } from './storage-order.dto';

@Controller('storage-order')
export class StorageOrderController {

    constructor(
        private readonly storageOrderService:StorageOrderService
    ){}

    @Get(':id')
    getStoreUser(@Param('id', ParseUUIDPipe) userId:string){
        return this.storageOrderService.getByID(userId)
    }

    @Post()
    createStorageOrder(@Body() orderInfo:CreateOrderStorageDto){
        const{userId,products}=orderInfo
        return this.storageOrderService.storage(userId,products)
    }

    @Delete('id')
    deleteStorageOrder(@Param('id',ParseUUIDPipe)userId:string){
        return this.deleteStorageOrder(userId)
    }
}

