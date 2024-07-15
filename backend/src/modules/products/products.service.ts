import { BadRequestException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/products/product.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto, UpdateCoffeDto } from './dtos/coffee.dto';
import { ImageService } from './image.service';
import { Coffee } from 'src/entities/products/product-coffee.entity';
import { messaging } from 'firebase-admin';



@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Coffee) private coffeeRepository: Repository<Coffee>,
        private readonly imageService:ImageService,
    ){}

    
    async getAll(){
        return await this.productRepository.find(
            {
                where:{
                    isDeleted:false
                },
                relations:{
                    category:true
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

    async addProduct(infoProduct:Partial<CreateCoffeeDto>, file?:Express.Multer.File){
        const foundProduct = await this.productRepository.findOneBy({article_id:infoProduct.article_id})
        if(foundProduct) throw new BadRequestException(`ya existe un producto con article_id: ${infoProduct.article_id}`)
        
        const foundCategory = await this.categoryRepository.findOneBy({name:infoProduct.category})
        if(!foundCategory) throw new BadRequestException(`Categoria:${infoProduct.category}  no existe debera crear en base de datos`)

        let imgURL: string | undefined;

        if(file){
            imgURL = await this.imageService.uploadFile(file)
            if(!imgURL) throw new UnprocessableEntityException(`Error al cargar la imagen`)
        }

        let builder =  this.productRepository;
        if(infoProduct.category==='coffee'){
            builder = this.coffeeRepository;
        }

        const newProduct = builder.create(
            {
                ...infoProduct,
                imgUrl:imgURL,
                category:foundCategory
            }
        )
        await builder.save(newProduct)
        return {message:"se creo el producto con exito",
                newProduct}
    }


    async updateProduct(id:string, infoProduct:Partial<UpdateCoffeDto>,file?: Express.Multer.File){
        const product = await this.productRepository.findOne({where:{id},relations:{category:true}});
        if(!product) throw new NotFoundException(`No se encontro el producto con id: ${id}`)
        
        let builder = this.productRepository;
        if(product.category.name==='coffee') builder = this.coffeeRepository

        const{category:newCategory,...updateData} = infoProduct

    
        if(file){
            const imgURL = await this.imageService.uploadFile(file)
            if(!imgURL) throw new UnprocessableEntityException(`Error al cargar la imagen`)
            updateData["imgUrl"] = imgURL
        }

        if(newCategory){
            const foundCategory = await this.categoryRepository.findOneBy({ name:newCategory});
            if(!foundCategory) throw new NotFoundException(`Categoria ${newCategory} no existe`)
            updateData["category"] = foundCategory;
        }

        await builder.update(id,updateData)

        return {
            message:`se actualizo el producto id: ${id}`
        }

    }

    async deleteProduct(id:string){

    }

    async addProduct(infoProduct:any, file?:Express.Multer.File){

    }

    async updateProduct(id:string, infoProduct:any){
        const product = await this.productRepository.findOneBy({id});
        if(!product) throw new NotFoundException(`No se encontro el producto con id: ${id}`)
        
        
    }

    async deleteProduct(){

    }

    }

