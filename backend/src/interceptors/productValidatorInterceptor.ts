import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateCoffeeDto, UpdateCoffeDto } from "src/modules/products/dtos/coffee.dto";
import { CreateProductdto, UpdatedProductdto } from "src/modules/products/dtos/products.dto";

export class ProductValidationInterceptor implements NestInterceptor{

    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request = context.switchToHttp().getRequest();
        const body: CreateProductdto = request.body

        let dtoClass;
        const normal_categories = ['endulzante', 'te', 'mate', 'chocolate','accesorio']

        const method = request.method
        if(body.category==='coffee') {
            dtoClass= method === 'POST'?CreateCoffeeDto:UpdateCoffeDto
        }
        else if (normal_categories.includes(body.category)){
            dtoClass = method === 'POST'?CreateProductdto:UpdatedProductdto
        }else{
            throw new BadRequestException(`Categoría: ${body.category}, no reconocida`);
        }

        const dtoObject:object = plainToClass(dtoClass,body)
        const errors = await validate(dtoObject);

        if(errors.length>0) throw new BadRequestException(`Validacion fallida, revisa las propiedades necesarias para la categoria ${body.category}`)
        request.body = dtoObject
        return next.handle()
    }
}