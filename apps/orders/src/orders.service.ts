import { Injectable } from '@nestjs/common'
import { CreateOrderRequest } from './dto/orders.dto'
import { OrdersRepository } from './orders.repository'
import { Order } from './schemas/order.schema'

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    createOrder(request: CreateOrderRequest): Promise<Order> {
        return this.ordersRepository.create(request)
    }

    getOrders(): Promise<Order[]> {
        return this.ordersRepository.find({})
    }

    getOrderById(id: string): Promise<Order> {
        return this.ordersRepository.findOne({ _id: id })
    }
}
