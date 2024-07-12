import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { AddOrderDto } from './order.dto';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
    ){}

    @Get()
    async GetAll(){
        return await this.orderService.GetAll()
    }   

    @Get(':id')
    async GetById(@Param('id', ParseUUIDPipe) id: string){
        return await this.orderService.GetById(id)
        
    }

    @Post()
    async addOne(@Body() orderInfo:AddOrderDto){    
        const {userId,products,adress,cuponDescuento} = orderInfo
        return await this.orderService.addOrder(userId,products,adress,Number(cuponDescuento))
    }

    @Delete(':id')
    async deleteOne(){
        
    }

}
