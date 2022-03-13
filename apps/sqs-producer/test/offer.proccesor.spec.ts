/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { SqsService } from '@ssut/nestjs-sqs';
import { OfferProccesor } from '../src/sqs-producer/offer.proccesor';

describe('SqsProducerService', () => {
  let offerProcessor: OfferProccesor;
  let sqsService: SqsService;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date(2021, 0, 1, 1, 1, 1));

    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [SqsService, OfferProccesor],
    })
      .overrideProvider(SqsService)
      .useValue({ send: jest.fn() })
      .compile();

    offerProcessor = app.get<OfferProccesor>(OfferProccesor);
    sqsService = app.get<SqsService>(SqsService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('root', () => {
    it('message not empty', async () => {
      // setup
      const date = (+new Date(2021, 0, 1, 1, 1, 1)).toString();
      const message = 'msg';

      // exercise
      const actual = await offerProcessor.process(message);

      // verify
      expect(actual).toBe('ok');
      expect(sqsService.send).toHaveBeenCalledWith('test-queue', { id: date, body: { date, message } });
    });

    it('message empty', async () => {
      // setup
      const date = (+new Date(2021, 0, 1, 1, 1, 1)).toString();
      const message = '';

      // exercise
      const actual = await offerProcessor.process(message);

      // verify
      expect(actual).toBe('ok');
      expect(sqsService.send).toHaveBeenCalledWith('test-queue', { id: date, body: { date, message: 'hoge' } });
    });
  });
});
