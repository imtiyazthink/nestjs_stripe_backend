import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { PaymentReqBody } from './types/PaymentReqBody';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.API_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
  }
  createPayment(paymemtReqBody: PaymentReqBody): Promise<any> {
    let totalAmount = 0;
    paymemtReqBody.products.forEach((product) => {
      totalAmount = totalAmount + product.price * product.quantity;
    });

    return this.stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: paymemtReqBody.currency,
    });
  }
}
