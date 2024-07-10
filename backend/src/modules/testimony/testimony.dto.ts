import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, } from 'class-validator';

export class CreateTestimonyDto {

  /**
   * Must be a name beetween 3 to 50 characters
   * @example 'Jose Luis Vasquez'
   */
  @IsString()
  @Length(3, 40)
  @IsNotEmpty()
  name: string;

  /**
  Must be an email valid. Mandatory data
  @example 'jose-vasquez@gmail.com'
  */
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

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