import { Injectable } from '@nestjs/common'

@Injectable()
export class BillingService {
    bill(data: Record<string, any>): void {
        console.log('Billing: ', data)
    }
}
