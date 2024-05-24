import { Inject, Injectable } from '@nestjs/common'
import { CreateOrderRequest } from './dto/orders.dto'
import { OrdersRepository } from './orders.repository'
import { Order } from './schemas/order.schema'
import { BILLING_SERVICE } from './constants/services'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        @Inject(BILLING_SERVICE) private billingClient: ClientProxy
    ) {}

    async createOrder(request: CreateOrderRequest) {
        const session = await this.ordersRepository.startTransaction()
        try {
            const order = await this.ordersRepository.create(request, { session })
            await lastValueFrom(this.billingClient.send('order_created', order))
            await session.commitTransaction()

            return order
        } catch (e) {
            await session.abortTransaction()
            throw e
        }
    }

    getOrders(): Promise<Order[]> {
        return this.ordersRepository.find({})
    }

    getOrderById(id: string): Promise<Order> {
        return this.ordersRepository.findOne({ _id: id })
    }
}
