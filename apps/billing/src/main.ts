import { NestFactory } from '@nestjs/core'
import { BillingModule } from './billing.module'
import { ConfigService } from '@nestjs/config'
import { RmqService } from '@app/common'

async function bootstrap() {
    const app = await NestFactory.create(BillingModule)
    const rmqService = app.get<RmqService>(RmqService)
    const configService = app.get<ConfigService>(ConfigService)
    app.connectMicroservice(rmqService.getOptions('billing'))
    await app.startAllMicroservices()
}
bootstrap()
