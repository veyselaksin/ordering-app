import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RmqContext, Transport } from '@nestjs/microservices'

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) {}

    getOptions(queue: string, noAck: boolean = false) {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RMQ_URI')],
                queue: this.configService.get<string>(`RMQ_${queue}_QUEUE`),
                noAck,
                persistent: true
            }
        }
    }

    ack(context: RmqContext): void {
        const channel = context.getChannelRef()
        const originalMessage: Record<string, any> = context.getMessage()
        channel.ack(originalMessage)
    }
}
