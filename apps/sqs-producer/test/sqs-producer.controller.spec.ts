import { Test, TestingModule } from '@nestjs/testing';
import { SqsService } from '@ssut/nestjs-sqs';
import { SqsProducerController } from '../src/sqs-producer.controller';
import { OfferProccesor } from '../src/sqs-producer/offer.proccesor';

describe('SqsProducerController', () => {
  let sqsProducerController: SqsProducerController;
  let offerProccesor: OfferProccesor;
  let sqsService: SqsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SqsProducerController],
      providers: [SqsService, OfferProccesor],
    })
      .overrideProvider(SqsService)
      .useValue({ send: jest.fn() })
      .compile();

    offerProccesor = app.get<OfferProccesor>(OfferProccesor);
    sqsProducerController = app.get<SqsProducerController>(SqsProducerController);
    sqsService = app.get<SqsService>(SqsService);
  });

  describe('process', () => {
    it('should return an message of ok', async () => {
      const result = 'ok';
      jest.spyOn(offerProccesor, 'process').mockResolvedValue(result);

      expect(await sqsProducerController.process('')).toBe(result);
    });
  });
});
