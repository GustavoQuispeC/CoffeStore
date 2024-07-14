import { Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(
        private readonly productService: ProductsService,
    ){}


    @Get()
    async getAll(@Query('category') category: string){

        if(category) 
            return this.productService.getAllByCategory(category)
        else
            return this.productService.getAll()
        
    }

    @Get("/available")
    async getAllAvailable(@Query('categry') category: string){
        if(category) 
            return this.productService.getAvailableByCategory(category)
        else
            return this.productService.getAvailable()
    }    

    @Get("/:id")
    async getById(@Param('id', ParseUUIDPipe) id: string){
        return this.productService.getById(id)
    }


    @Post()
    async createProduct(){

        return "se creo con exito el producto"
    } 
    
    @Put(':id')
    async updateProuct(){
        return "se realizo el upda del producto"
    }

    @Delete(':id')
    async deleteProduct(){
        return "se elimino del producto"
    }
    
}
