import { Module } from '@nestjs/common'
import { BillingController } from './billing.controller'
import { BillingService } from './billing.service'
import { RmqModule } from '@app/common/rmq/rmq.module'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RMQ_URI: Joi.string().required(),
                RMQ_BILLING_QUEUE: Joi.string().required()
            })
        }),
        RmqModule
    ],
    controllers: [BillingController],
    providers: [BillingService]
})
export class BillingModule {}
