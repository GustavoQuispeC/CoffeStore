import { IsNumber, IsString, IsEmail, ValidateNested, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

// export class PayerDto {
//   @IsEmail()
//   email: string;
// }

// export class CreatePaymentDto {
//     // @IsArray()
//     // @ArrayNotEmpty()
//     @ValidateNested({each: true})
//     @Type(() => ItemDTO)
//     items: ItemDTO[]
// }

export class CreatePaymentDto {
//   @IsNumber()
//   transaction_amount: number;

//   @IsString()
//   description: string;

//   @IsString()
//   payment_method_id: string;

//   @ValidateNested()
//   @Type(() => PayerDto)
//   payer: PayerDto;

    // @IsString()
    title: string = "Coffe La Esmeralda";

    // @IsNumber()
    quantity: number = 1;

    // @IsNumber()
    unit_price: number;
  
}

  
  