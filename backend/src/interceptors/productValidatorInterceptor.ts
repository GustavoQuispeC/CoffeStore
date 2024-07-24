import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Category } from "src/entities/category.entity";
import { CreateCoffeeDto, UpdateCoffeDto } from "src/modules/products/dtos/coffee.dto";
import { CreateProductdto, UpdatedProductdto } from "src/modules/products/dtos/products.dto";
import { Repository } from "typeorm";

export class ProductValidationInterceptor implements NestInterceptor{

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ){}

    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request = context.switchToHttp().getRequest();
        const body: CreateProductdto = request.body
        const method = request.method

        let dtoClass;
        const categoryNames = ['coffee', 'endulzante', 'te', 'mate', 'chocolate', 'accesorio'];
        const categoryIDs = await Promise.all(
        categoryNames.map(name => this.categoryRepository.findOne({ where: { name } }))
        );

        const [coffeeID, ...otherID] = categoryIDs.map(category => category.id);



        if(body.categoryID === coffeeID) {
            dtoClass= method === 'POST'?CreateCoffeeDto:UpdateCoffeDto
        }
        else if (otherID.includes(body.categoryID)||body.categoryID===undefined){
            dtoClass = method === 'POST'?CreateProductdto:UpdatedProductdto
        }else{
            throw new BadRequestException(`Categoría: ${body.categoryID}, no reconocida`);
        }

        const dtoObject:object = plainToClass(dtoClass,body)
        const errors = await validate(dtoObject);

        if(errors.length>0) throw new BadRequestException(`Validacion fallida, revisa las propiedades necesarias para la categoria ${body.categoryID}`)
        request.body = dtoObject
        return next.handle()
    }
}