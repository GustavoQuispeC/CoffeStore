import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateTestimonyDto {

  /**
  *Must be a String idUser
  *@example '"userId": "7871f2c9-6b43-4df6-9f93-9a93c388f26b"'
  */
  @IsNotEmpty()
  @IsUUID()
  userId: string

  /**
   * Must be a description valid
   * @example 'bueno'
   */
  @IsString()
  description:string

  /**
   * Must be a number
   * @example 4
   */
//   @IsOptional()
  @IsNumber()
  @Type(()=> Number)
  @IsPositive()
  punctuation: number;

}

export class CreateTestimonyEntityDto {

  /**
   * Must be a description valid
   * @example 'bueno'
   */
  @IsString()
  description:string

  /**
   * Must be a number
   * @example 4
   */
//   @IsOptional()
  @IsNumber()
  @Type(()=> Number)
  @IsPositive()
  punctuation: number;

}