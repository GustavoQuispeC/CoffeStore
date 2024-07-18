import { ChildEntity, Column, Entity } from "typeorm";
import { Product } from "./product.entity";
import { Presentacion } from "src/enum/presentacion.enum";
import { TipoGrano } from "src/enum/tipoGrano.enum";
import { Medida } from "src/enum/medidas.enum";

//@ChildEntity()
@Entity()
export class Coffee extends Product{
    @Column({
        type: 'enum',
        enum: Presentacion,
        default: Presentacion.GRANO
    })
    presentacion:Presentacion

    @Column({
        type: 'enum',
        enum: TipoGrano,
        default:TipoGrano.COLOMBIANO
    })
    tipoGrano:TipoGrano

    @Column({
        type: 'enum',
        enum: Medida,
        default: Medida.UNIDADES
    })
    medida:Medida
}