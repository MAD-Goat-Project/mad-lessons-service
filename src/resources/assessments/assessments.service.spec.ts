import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentsService } from './assessments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssessmentEntity } from '../../models/assessment/assessment.entity';

describe('AssessmentsService', () => {
  let service: AssessmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssessmentsService,
        {
          provide: getRepositoryToken(AssessmentEntity),
          useValue: {}, // Use an empty object or your desired mock implementation
        },
      ],
    }).compile();

    service = module.get<AssessmentsService>(AssessmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
