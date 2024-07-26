import { BadRequestException, Body, Controller, Get, Param, Post, Redirect, ValidationPipe } from "@nestjs/common";
import { MercadoPagoService } from "./mercado-pago.service";
import { CreatePaymentDto } from "./create-payment.dto";

@Controller('market-pay')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('url-proccess')
  async createPayment(@Body(new ValidationPipe()) createPaymentDto: CreatePaymentDto): Promise<any> {
    console.log('Received DTO:', createPaymentDto);
    try {
        return await this.mercadoPagoService.createPayment(createPaymentDto);
      } catch (error) {
        throw new Error(`Error creating payment: ${error.message}`);
      }
  }

}