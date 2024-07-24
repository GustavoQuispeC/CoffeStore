import { PickType } from "@nestjs/swagger";
import { AddOrderDto } from "../order/order.dto";

export class CreateOrderStorageDto extends PickType(AddOrderDto,['userId','products']){

}