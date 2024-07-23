import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Min, ValidateNested } from "class-validator";


export class ProductInfo{
    @IsUUID()
    id: string;
  
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    cantidad: number;
}

export class AddOrderDto{
    @IsUUID()
    userId:string

    @IsString()
    @IsNotEmpty()
    @Optional()
    adress?:string

    @IsNumber()
    @Optional()
    cuponDescuento?:number

    @Type(() => Date)
    @IsDate()
    @Optional()
    deliveryDate?:Date

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProductInfo)
    products: ProductInfo[]
}