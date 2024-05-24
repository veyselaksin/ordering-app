import { Injectable } from '@nestjs/common'

@Injectable()
export class BillingService {
    getHello(): string {
        return 'Hello World!'
    }

    bill(data: Record<string, any>) {
        console.log('BillingService: bill', data)
    }
}
