import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/products/product.entity';
import { DataSource, Repository } from 'typeorm';
import * as dataCategory from './dataCategory.json'
import * as dataProducts from './dataProduts.json'
import * as dataCoffee from './dataCoffee.json'
import * as dataChocolate from './dataChocolate.json'
import * as dataMate from './dataMate.json'
import * as dataTe from './dataTe.json'
import * as dataEndulzante from './dataEndulzante.json'
import * as dataAccesorios from './dataAccesorio.json'
import * as dataUser from './dataUser.json'
import { Coffee } from 'src/entities/products/product-coffee.entity';
import { Chocolate } from 'src/entities/products/product-chocolate.entity';
import { Mate } from 'src/entities/products/product-mate.entity';
import {Te} from 'src/entities/products/product-te.entity'
import { Endulzante } from 'src/entities/products/product-endulzante.entity';
import { Accesorio } from 'src/entities/products/product-accesorio.entity';
import { User } from 'src/entities/user.entity';
import { OrderService } from 'src/modules/order/order.service';
import { StorageOrderService } from 'src/modules/storageOrder/storage-order.service';

@Injectable()
export class PreloadService implements OnModuleInit{
    private repositories: { [key: string]: {repository:Repository<any>,class:any} };
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Coffee) private coffeeRepository: Repository<Coffee>,
        @InjectRepository(Chocolate) private chocolateRepository: Repository<Chocolate>,
        @InjectRepository(Mate) private mateRepository: Repository<Mate>,
        @InjectRepository(Te) private teRepository: Repository<Te>,
        @InjectRepository(Endulzante) private endulzanteRepository: Repository<Endulzante>,
        @InjectRepository(Accesorio) private accesorioRepository: Repository<Accesorio>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly orderService:OrderService,
        private readonly storageService:StorageOrderService
    ){
        this.repositories = {
            "coffee":{repository:coffeeRepository, class: Coffee},
            "chocolate":{repository:chocolateRepository, class: Chocolate},
            "mate":{repository:mateRepository, class: Mate},
            "te":{repository:teRepository, class: Te},
            "endulzante":{repository:endulzanteRepository, class: Endulzante},
            "accesorio":{repository:accesorioRepository, class: Accesorio},
        }
    }

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


    async addProducts(data:any,categoria:string){
        const preloadCategory = await this.categoryRepository.findOne({where:{
            name:categoria
        }});
        if(!preloadCategory) throw new Error(`No existe la categoria: ${categoria} en base de datos`)

        const noSuitableProducts = []
        const suitableProducts = data.map((product)=>{
            const existCategory = (preloadCategory.name === product.category)
            if(!existCategory){
                noSuitableProducts.push(product)
                return null
            }else{
                const objectProduct = this.repositories[categoria].repository.create(
                    {
                        article_id:product.article_id,
                        description:product.description,
                        imgUrl:product.imgUrl,
                        price:product.price, 
                        stock:product.stock,
                        category:preloadCategory
                    }
                )
                return objectProduct
            }
        }).filter((e) => e!== null)

        for(const product of suitableProducts){
            await this.repositories[categoria].repository
            .createQueryBuilder()
            .insert()
            .into(this.repositories[categoria].class)
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
                console.log(`No se pudo cargar el producto ${e}, revisar el nombre ${e.category}`)
            })
        }
        console.log(`Finalizo la carga de ${categoria}`)
    }

    async addDefaultProducts(){
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

    async addDefaultUser(dataUser){
        
        await Promise.all(dataUser.map(async (user)=>{
            const objUser = this.userRepository.create({
                ...user
            })

            await this.userRepository.save(objUser)
        }))

        console.log("Se cargo usuarios por defecto")
    }

    async addDefaultOrder(){

        const users = await this.userRepository.find();
        const product_1 = await this.chocolateRepository.find();
        const product_2 = await this.teRepository.find();

        const response = await this.orderService.addOrder(users[0].id,[
            {id:product_1[0].id, cantidad:2},
            {id:product_2[0].id, cantidad:3}
        ],"tienda",0,undefined)
        
        console.log("se cargo preorder por defecto")
    }

    async addDefaultStorage(){
        const users = await this.userRepository.find();
        const product_1 = await this.chocolateRepository.find();
        const product_2 = await this.teRepository.find();

        await this.storageService.storage(users[0].id,[
            {id:product_1[0].id, cantidad:5},
            {id:product_2[0].id, cantidad:1}
        ])
        
        console.log("se cargo  storage por defecto")

    }

    async onModuleInit() {
        await this.addDefaultCategories();
        //await this.addDefaultProducts()
        await this.addProducts(dataCoffee,'coffee')
        await this.addProducts(dataTe,'te')
        await this.addProducts(dataMate,'mate')
        await this.addProducts(dataChocolate,'chocolate')
        await this.addProducts(dataEndulzante,'endulzante')
        await this.addProducts(dataAccesorios,'accesorio')
        await this.addDefaultUser(dataUser)
        await this.addDefaultOrder()
        await this.addDefaultStorage()
    }
}
