import { AbstractRepository } from '@app/common'
import { Injectable, Logger } from '@nestjs/common'
import { Order } from './schemas/order.schema'

@Injectable()
export class OrderRepository extends AbstractRepository<Order> {
    // Add your repository methods here
    protected readonly logger = new Logger(OrderRepository.name)

    constructor() {
}
