import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products/product.entity';
import { Storage } from 'src/entities/storage.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ProductInfo } from '../order/order.dto';

@Injectable()
export class StorageOrderService {

    constructor(
        @InjectRepository(Storage) private storageRepository: Repository<Storage>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Product) private productsRepository: Repository<Product>,
    ){}

    async getByID(idUser:string){

        const userFound = await this.usersRepository.findOneBy({id:idUser})
        if(!userFound) throw new NotFoundException(`No se encontro el usuario: ${idUser}`)
        
        const info = await this.usersRepository.createQueryBuilder('users')
        .leftJoinAndSelect('users.storage', 'storage')
        .leftJoinAndSelect('storage.product','product')
        .getMany()

        return info
    }

    async storage(idUser:string,products:ProductInfo[]){

        const userFound = await this.usersRepository.findOne({where:{
            id:idUser
        }})
        if(!userFound) throw new NotFoundException(`No existe el usuario: ${idUser}`) 
        
        const storage = await this.storageRepository.createQueryBuilder('storage')
                        .leftJoinAndSelect('storage.user','user')
                        .where('user.id = :id',{id:idUser})
                        .getMany();

        //clear before storage
        if(storage.length !== 0){
            await Promise.all(
                storage.map(async(e)=>{
                    await this.storageRepository.delete(e)
                })
            )
        }

        // check if all products exist in database
        await Promise.all(
            products.map(async (product)=>{
                const productFound = await this.productsRepository.findOneBy({id:product.id})
                if(!productFound) throw new NotFoundException(`No existe el producto: ${product.id}`)
            })
        )
        
        //save data
        await Promise.all(
            products.map(async (product)=>{
                const objectProduct = await this.productsRepository.findOne({
                    where:{id:product.id}
                })
                const item = this.storageRepository.create({
                    user:userFound,
                    product:objectProduct,
                    quantity:product.cantidad
                })
                    await this.storageRepository.save(item)
                }
            )
        )
        
        return {
            message:'Se guardo la orden'
        }
    }

    async delete(idUser:string){
        const storage = await this.storageRepository.createQueryBuilder('storage')
        .leftJoinAndSelect('storage.user','user')
        .where('user.id = :id',{id:idUser})
        .getMany();

        if(storage.length === 0) return {message:"Storage de usuario vacio"}

        await Promise.all(
            storage.map(async(e)=>{
                await this.storageRepository.delete(e)
            })
        )
        return {
            message:`se elimino local storage de user ${idUser}`
        }

    }
}


