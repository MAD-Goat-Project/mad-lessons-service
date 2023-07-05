import { Test, TestingModule } from '@nestjs/testing';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerEntity } from '../../models/answer/answer.entity';

describe('AnswersController', () => {
  let controller: AnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(AnswerEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AnswersController>(AnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
