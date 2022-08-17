import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentReqBody } from './types/PaymentReqBody';
import { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  createPayments(
    @Res() response: Response,
    @Body() paymentReqBody: PaymentReqBody,
  ) {
    return this.paymentService
      .createPayment(paymentReqBody)
      .then((res) => {
        response.status(HttpStatus.CREATED).json(res);
      })
      .catch((err) => {
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }
}
