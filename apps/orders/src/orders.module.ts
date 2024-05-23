import { Module } from '@nestjs/common'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { DatabaseModule } from '@app/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './schemas/order.schema'
import { OrdersRepository } from './orders.repository'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required()
            }),
            envFilePath: ['.env']
        }),
        DatabaseModule,
        MongooseModule.forFeature([
            {
                name: Order.name,
                schema: OrderSchema
            }
        ])
    ],
    controllers: [OrdersController],
    providers: [OrdersRepository, OrdersService]
})
export class OrdersModule {}
