import { Controller, Post, Body } from '@nestjs/common';
import { OfferProccesor } from './sqs-producer/offer.proccesor';

@Controller()
export class SqsProducerController {
  constructor(private readonly offerProccesor: OfferProccesor) {}

  @Post()
  async process(@Body() message: string) {
    await this.offerProccesor.process(message);

    return 'ok';
  }
}
