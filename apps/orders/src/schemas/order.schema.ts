import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { AbstractDocument } from '@app/common'

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
    // Add your schema here
    @Prop()
    name: string

    @Prop()
    price: number

    @Prop()
    phoneNumber: string
}

export const OrderSchema = SchemaFactory.createForClass(Order)
