import { Module } from "@nestjs/common";
import { MercadoPagoService } from "./mercado-pago.service";
import { MercadoPagoController } from "./mercado-pago.controller";

@Module({
    imports: [],
    providers: [MercadoPagoService],
    controllers: [MercadoPagoController],
    exports: [],
})

export class MercadoPagoModule {}