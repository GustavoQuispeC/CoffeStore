import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { CreatePaymentDto } from './create-payment.dto';

@Injectable()
export class MercadoPagoService {
  private client: any;
  private payment: any;
  private preference: any;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken:
        // 'TEST-8223702197843229-071020-5135a7605e7dd8d5a6b31376f483b8df-818994002',
      // 'TEST-1151107145533672-071111-76afcf77cd87b928fe10d6a578f784c9-607688037',
      'APP_USR-5740345286529959-071116-13b66c5cd20dc084f3b94e932540b885-1898155660',
      options: { timeout: 5000 },
    });
    this.preference = new Preference(this.client);
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    try {

      const items = createPaymentDto.items || [];

      const response = await this.preference.create({
        body: {
          items: items.map(item => ({
              title: item.title,
              description: item.description,
              quantity: item.quantity,
              unit_price: item.unit_price,
          })),
          
        },
      });
    
      console.log("response: ", response, "Fin de response");
      
      
      return response;
    } catch (error) {
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }
}
