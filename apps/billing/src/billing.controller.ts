import { Controller, Get } from '@nestjs/common'
import { BillingService } from './billing.service'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class BillingController {
    constructor(private readonly billingService: BillingService) {}

    @Get()
    getHello(): string {
        return this.billingService.getHello()
    }

    @EventPattern('order_created')
    async handleOrderCreated(@Payload() data: Record<string, any>, @Ctx() context: RmqContext) {
        return this.billingService.bill(data)
    }
}
