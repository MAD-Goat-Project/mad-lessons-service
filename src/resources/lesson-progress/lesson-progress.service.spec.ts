import { Test, TestingModule } from '@nestjs/testing';
import { LessonProgressService } from './lesson-progress.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserLessonProgressEntity } from '../../models/user-lesson-progress/user-lesson-progress.entity';

describe('LessonProgressService', () => {
  let service: LessonProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonProgressService,
        {
          provide: getRepositoryToken(UserLessonProgressEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LessonProgressService>(LessonProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
