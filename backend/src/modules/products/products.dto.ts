import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Length, Max, Min } from "class-validator"

export class UpdatedProductdto {
    

    @IsOptional()
    @IsString()
    @Length(3, 50)
    description?:string


    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    price?:number


    /**
     * Must be a integer
     * @example 5
     */
    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    @IsInt()
    stock?:number

    /**
     * Must be a number between 0 and 100
     * @Example 20
     */
    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    @Min(0)
    @Max(100)
    discount?: number


    /**
     *  Must be a UUID id string of a category
     * @example '908a59d6-a87f-4ea1-a89b-23747a668cf8'
     */
    @IsOptional()
    @IsUUID()
    @IsString()
    categoryID?:string


    /**
     * Must be a boolean valor, optional value
     * @example 'true'
     */
    @IsOptional()
    @IsBoolean()
    condition: boolean
}