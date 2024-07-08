import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/products/product.entity';
import { DataSource, Repository } from 'typeorm';
import * as dataCategory from './dataCategory.json'
import * as dataProducts from './dataProduts.json'

@Injectable()
export class PreloadService implements OnModuleInit{

    constructor(

        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ){}

    async delay(ms: number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async addDefaultCategories(){
        await Promise.all(
            dataCategory.map(async(category)=>{
                await this.categoryRepository
                .createQueryBuilder()
                .insert()
                .into(Category)
                .values({name: category})
                .orIgnore()
                .execute()
            })
            )
        
    }

    async addProducts(){
        const preloadCategories = await this.categoryRepository.find();
        const noSuitableProducts = []
        const suitableProducts = dataProducts.map((product)=>{
            const categoryFound = preloadCategories.find((category)=>{
                return category.name === product.category
            })

            if(!categoryFound){
                noSuitableProducts.push(product.category)
                return null
            }
            else{
                const objectProduct = this.productRepository.create(
                    {
                        article_id:product.article_id,
                        description:product.description,
                        imgUrl:product.imgUrl,
                        price:product.price, 
                        stock:product.stock,
                        category:categoryFound
                    }
                )
                return objectProduct
            }
        }).filter(element => element !== null)

        for(const product of suitableProducts){
            await this.productRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values({
                ...product 
            })
            .orUpdate(
                ['description','imgUrl','price','stock','categoryId'],
                ['article_id']
            )
            .execute()
        }

        if(noSuitableProducts.length>0){
            noSuitableProducts.forEach((e)=>{
                console.log(`No se puedo cargar los productos con la categoria: ${e} por que no existen en la base de datos`)
            })
        }
        console.log("Precarga de productos con exito")

    }

    async onModuleInit() {
        await this.addDefaultCategories();
        this.delay(1000)
        await this.addProducts()
    }
}
