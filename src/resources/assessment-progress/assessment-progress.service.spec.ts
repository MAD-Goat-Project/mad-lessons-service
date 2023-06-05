import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentProgressService } from './assessment-progress.service';

describe('AssessmentProgressService', () => {
  let service: AssessmentProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssessmentProgressService],
    }).compile();

    service = module.get<AssessmentProgressService>(AssessmentProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
