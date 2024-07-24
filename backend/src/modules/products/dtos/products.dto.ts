import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Length, Max, Min } from "class-validator"

export class CreateProductdto{

    @IsNotEmpty()
    @Type(()=> Number)
    @IsPositive()
    @IsNumber()
    article_id: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @Type(()=> Number)
    @IsPositive()
    price?:number

    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    @IsInt()
    stock?:number

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    discount?: number

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;

    @IsNotEmpty()
    @IsUUID() 
    categoryID: string;
}




export class UpdatedProductdto {
    
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @Type(()=> Number)
    @IsPositive()
    price?:number

    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    @IsInt()
    stock?:number

    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    discount?: number

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;

    @IsOptional()
    @IsString() 
    categoryID?: string;
}