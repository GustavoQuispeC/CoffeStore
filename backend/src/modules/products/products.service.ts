import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/products/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ){}

    
    async getAll(){
        return await this.productRepository.find(
            {
                where:{
                    isDeleted:false
                }
            }
        );
    }

    async getAvailable(){
        return await this.productRepository.find({
            where:{
                isAvailable:true,
                isDeleted:false
        }})
    }

    async getAllByCategory(category:string){
        const categoryFound = await this.categoryRepository.findOne({
            where:{
                name:category
        }})
        if(!categoryFound) throw new NotFoundException(`No se encontro categoria: ${category}`)

        return   await this.productRepository.createQueryBuilder('products')
                .innerJoinAndSelect('products.category', 'categories')
                .where('categories.id = :categoriaId', { categoriaId: categoryFound.id})
                .andWhere('products.isDeleted = :isDeleted', { isDeleted: false })
                .getMany();
        }

    async getAvailableByCategory(category:string){
        const categoryFound = await this.categoryRepository.findOne({
            where:{
                name:category
        }})
        if(!categoryFound) throw new NotFoundException(`No se encontro categoria: ${category}`)

        return   await this.productRepository.createQueryBuilder('products')
                .innerJoinAndSelect('products.category', 'categories')
                .where('categories.id = :categoriaId', { categoriaId: categoryFound.id})
                .andWhere('products.isDeleted = :isDeleted', { isDeleted: false })
                .andWhere('products.isAvailable = :isAvailable', { isAvailable: true })
                .getMany();
        }

    async getById(id:string){
        const product = await this.productRepository.findOne({
            where: {id, isDeleted:false, isAvailable:true},
            relations: {
                category: true,
            },
        });
        if(!product) throw new NotFoundException(`No se encontro producto con ${id}`)
        return product;
    }

    }

