import { Test, TestingModule } from '@nestjs/testing';
import { LessonProgressController } from './lesson-progress.controller';
import { LessonProgressService } from './lesson-progress.service';
import { UserLessonProgressEntity } from '../../models/user-lesson-progress/user-lesson-progress.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LessonProgressController', () => {
  let controller: LessonProgressController;
  let service: LessonProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonProgressController],
      providers: [
        LessonProgressService,
        {
          provide: getRepositoryToken(UserLessonProgressEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LessonProgressController>(LessonProgressController);
    service = module.get<LessonProgressService>(LessonProgressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
