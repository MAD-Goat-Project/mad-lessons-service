import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentProgressController } from './assessment-progress.controller';
import { AssessmentProgressService } from './assessment-progress.service';

describe('AssessmentProgressController', () => {
  let controller: AssessmentProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentProgressController],
      providers: [AssessmentProgressService],
    }).compile();

    controller = module.get<AssessmentProgressController>(
      AssessmentProgressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
