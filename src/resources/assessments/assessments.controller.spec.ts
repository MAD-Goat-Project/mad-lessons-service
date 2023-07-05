import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentsController } from './assessments.controller';
import { AssessmentsService } from './assessments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssessmentEntity } from '../../models/entitities';

describe('AssessmentsController', () => {
  let controller: AssessmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentsController],
      providers: [
        AssessmentsService,
        {
          provide: getRepositoryToken(AssessmentEntity),
          useValue: {}, // Use an empty object or your desired mock implementation
        },
      ],
    }).compile();

    controller = module.get<AssessmentsController>(AssessmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
