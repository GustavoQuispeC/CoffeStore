import { Controller, Get, Inject, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
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

}
