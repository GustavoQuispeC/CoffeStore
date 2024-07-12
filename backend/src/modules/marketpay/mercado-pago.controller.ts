import { BadRequestException, Body, Controller, Get, Param, Post, Redirect, ValidationPipe } from "@nestjs/common";
import { MercadoPagoService } from "./mercado-pago.service";
import { CreatePaymentDto } from "./create-payment.dto";

@Controller('market-pay')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) {}

    // @Post('url-proccess')
    // async generarUrlPago(@Body() req: CreatePaymentDto): Promise<any> {        
    //     try {
    //         const urlPago = await this.mercadoPagoService.capturePayment(req);
    //         return { success: true, data: urlPago};
    //     } catch (error) {
    //         console.log(error);
    //         return { success: false, error: error.message };
            
            
    //     }
    // }

    @Post('url-proccess')
  async createPayment(@Body(new ValidationPipe()) createPaymentDto: CreatePaymentDto): Promise<any> {
    console.log('Received DTO:', createPaymentDto);
    // try {
    //   const response = await this.mercadoPagoService.createPayment(createPaymentDto);
    //   const paymentId = response.id; 
    //   const paymentUrl = await this.mercadoPagoService.getPaymentUrl(paymentId);
    //   return { success: true, paymentUrl };
    // } catch (error) {
    //     console.error('Error creating payment:', error);
    //   throw new BadRequestException(`Error creating payment: ${error.message}`);
    // }
    try {
        return await this.mercadoPagoService.createPayment(createPaymentDto);
      } catch (error) {
        throw new Error(`Error creating payment: ${error.message}`);
      }
  }

//   @Get(':paymentId')
//   @Redirect()
//   async redirectToPayment(@Param('paymentId') paymentId: string): Promise<{ url: string }> {
//     try {
//       const paymentUrl = await this.mercadoPagoService.getPaymentUrl(paymentId);
//       return { url: paymentUrl };
//     } catch (error) {
//       throw new BadRequestException(`Error getting payment URL: ${error.message}`);
//     }
//   }
}