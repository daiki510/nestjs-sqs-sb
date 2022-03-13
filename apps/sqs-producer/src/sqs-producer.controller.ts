import { Controller, Post, Body } from '@nestjs/common';
import { OfferProccesor } from './sqs-producer/offer.proccesor';

@Controller()
export class SqsProducerController {
  constructor(private readonly offerProccesor: OfferProccesor) {}

  @Post()
  async process(@Body() message: string) {
    return await this.offerProccesor.process(message);
  }
}
