import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerEntity } from '../../models/answer/answer.entity';

describe('AnswersService', () => {
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(AnswerEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
