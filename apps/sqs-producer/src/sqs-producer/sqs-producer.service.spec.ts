import { Test, TestingModule } from '@nestjs/testing';
import { OfferProccesor } from './offer.proccesor';

describe('SqsProducerService', () => {
  let service: OfferProccesor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferProccesor],
    }).compile();

    service = module.get<OfferProccesor>(OfferProccesor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
