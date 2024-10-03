import { Test, TestingModule } from '@nestjs/testing';
import { DriverLicensesService } from './driver-licenses.service';

describe('DriverLicensesService', () => {
  let service: DriverLicensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverLicensesService],
    }).compile();

    service = module.get<DriverLicensesService>(DriverLicensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
