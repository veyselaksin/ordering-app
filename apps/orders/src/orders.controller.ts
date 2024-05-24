import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderRequest } from './dto/orders.dto'
import { Order } from './schemas/order.schema'

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Body() request: CreateOrderRequest): Promise<Order> {
        return this.ordersService.createOrder(request)
    }

    @Get()
    async getOrders(): Promise<Order[]> {
        return this.ordersService.getOrders()
    }

    @Get(':id')
    async getOrderById(@Param('id') id: string): Promise<Order> {
        return this.ordersService.getOrderById(id)
    }
}
