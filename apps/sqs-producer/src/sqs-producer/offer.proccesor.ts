import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { Message } from '@app/commons';

@Injectable()
export class OfferProccesor {
  constructor(private readonly sqsService: SqsService) {}

  async process(message: string): Promise<string> {
    const data: Message = {
      date: (+new Date()).toString(),
      message: message || 'hoge',
    };

    await this.sqsService.send('test-queue', {
      id: data.date,
      body: data,
    });

    return 'ok';
  }
}
