import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentProgressController } from './assessment-progress.controller';
import { AssessmentProgressService } from './assessment-progress.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RabbitMQService } from '../../providers/rabbit-mq/rabbit-mq.provider.service';
import { UserAssessmentProgressEntity } from '../../models/entitities';

describe('AssessmentProgressController', () => {
  let controller: AssessmentProgressController;
  let rabbitMQServiceMock: Partial<RabbitMQService>; // Mocked RabbitMQService

  beforeEach(async () => {
    rabbitMQServiceMock = {
      // Implement mocked methods or behavior here
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentProgressController],
      providers: [
        AssessmentProgressService,
        {
          provide: getRepositoryToken(UserAssessmentProgressEntity),
          useValue: {}, // Use an empty object or your desired mock implementation
        },
        {
          provide: RabbitMQService,
          useValue: rabbitMQServiceMock, // Use the mock implementation
        },
      ],
    }).compile();

    controller = module.get<AssessmentProgressController>(
      AssessmentProgressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
