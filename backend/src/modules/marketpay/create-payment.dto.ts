export class CreatePaymentDto {

    items: {
    title: string;
    description: string;
    quantity: number;
    unit_price: number;
    }[];
}