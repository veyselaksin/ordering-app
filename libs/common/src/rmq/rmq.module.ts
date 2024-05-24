import { DynamicModule, Module } from '@nestjs/common'
import { RmqService } from './rmq.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

type RmqModuleOptions = {
    name: string
}

@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule {
    static register({ name }: RmqModuleOptions): DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService: ConfigService) => {
                            return {
                                transport: Transport.RMQ,
                                options: {
                                    urls: [configService.get<string>('RMQ_URI')],
                                    queue: configService.get<string>(`RMQ_${name.toUpperCase()}_QUEUE`)
                                }
                            }
                        },
                        inject: [ConfigService]
                    }
                ])
            ],
            exports: [ClientsModule]
        }
    }
}
