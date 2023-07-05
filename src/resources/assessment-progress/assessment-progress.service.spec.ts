import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentProgressService } from './assessment-progress.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAssessmentProgressEntity } from '../../models/user-assessment-progress/user-assessment-progress.entity';
import { RabbitMQService } from '../../providers/rabbit-mq/rabbit-mq.provider.service';

describe('AssessmentProgressService', () => {
  let service: AssessmentProgressService;
  let rabbitMQServiceMock: Partial<RabbitMQService>; // Mocked RabbitMQService

  beforeEach(async () => {
    rabbitMQServiceMock = {
      // Implement mocked methods or behavior here
    };
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AssessmentProgressService>(AssessmentProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
