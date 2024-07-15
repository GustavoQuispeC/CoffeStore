import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseFilePipeBuilder, ParseUUIDPipe, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductValidationInterceptor } from 'src/interceptors/productValidatorInterceptor';
import { CreateProductdto, UpdatedProductdto } from './dtos/products.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
    async getAllAvailable(@Query('category') category: string){
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
    @UseInterceptors(ProductValidationInterceptor)
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(@Body() productInfo:CreateProductdto,
                        @UploadedFile()file?: Express.Multer.File){
        return this.productService.addProduct(productInfo,file)
        
    } 
    
    @Put(':id')
    @UseInterceptors(ProductValidationInterceptor)
    @UseInterceptors(FileInterceptor('file'))
    async updateProuct(@Param('id', ParseUUIDPipe) id: string,
                        @Body() productInfo:UpdatedProductdto,
                        @UploadedFile()file?: Express.Multer.File){

        return this.productService.updateProduct(id,productInfo,file)
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseUUIDPipe) id: string){
        return await this.productService.deleteProduct(id)
    }
    
}
