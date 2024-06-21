import { Controller } from '@nestjs/common'
import { BillingService } from './billing.service'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { RmqService } from '@app/common'

@Controller()
export class BillingController {
    constructor(
        private readonly billingService: BillingService,
        private readonly rmqService: RmqService
    ) {}

    @EventPattern('order_created')
    async handleOrderCreated(@Payload() data: Record<string, any>, @Ctx() context: RmqContext): Promise<void> {
        this.billingService.bill(data)
        this.rmqService.ack(context)

        console.log('Order created event handled successfully!')
    }
}
