import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity, LessonEntity } from '../../models/entitities';
import { CategoriesService } from '../categories/categories.service';

describe('LessonsController', () => {
  let controller: LessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [
        LessonsService,
        CategoriesService,
        {
          provide: getRepositoryToken(LessonEntity),
          useValue: {}, // Use an empty object or your desired mock implementation
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {}, // Use an empty object or your desired mock implementation
        },
      ],
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
