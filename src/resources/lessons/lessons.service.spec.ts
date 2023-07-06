import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LessonsService } from './lessons.service';
import { CategoriesService } from '../categories/categories.service';
import { CategoryEntity, LessonEntity } from '../../models/entitities';
import { HttpException } from '@nestjs/common';

describe('LessonsService', () => {
  let service: LessonsService;
  let categoryService: CategoriesService;
  let lessonRepositoryMock: any;

  beforeEach(async () => {
    lessonRepositoryMock = {
      createQueryBuilder: jest.fn(() => lessonRepositoryMock),
      where: jest.fn(() => lessonRepositoryMock),
      orderBy: jest.fn(() => lessonRepositoryMock),
      getMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        CategoriesService,
        {
          provide: getRepositoryToken(LessonEntity),
          useValue: lessonRepositoryMock,
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {}, // Use an empty object or your desired mock implementation
        },
      ],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
    categoryService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should throw HttpException if the category ID is invalid', async () => {
      // Arrange
      const categoryId = 1;
      jest.spyOn(categoryService, 'findOne').mockResolvedValueOnce(undefined);

      // Act & Assert
      await expect(service.findAll(categoryId)).rejects.toThrowError(
        HttpException,
      );

      expect(categoryService.findOne).toHaveBeenCalledWith(categoryId);
    });

    it('should return an array of lessons for a valid category ID', async () => {
      // Arrange
      const categoryId = 1;
      const lessonsArray = [
        { id: 1, title: 'Lesson 1' },
        { id: 2, title: 'Lesson 2' },
      ];
      jest
        .spyOn(categoryService, 'findOne')
        .mockResolvedValueOnce(<CategoryEntity>{});
      lessonRepositoryMock.getMany.mockResolvedValueOnce(lessonsArray);

      // Act
      const result = await service.findAll(categoryId);

      // Assert
      expect(result).toEqual(lessonsArray);
      expect(categoryService.findOne).toHaveBeenCalledWith(categoryId);
      expect(lessonRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'lesson',
      );
      expect(lessonRepositoryMock.where).toHaveBeenCalledWith(
        'lesson.category_id = :category_id',
        { category_id: categoryId },
      );
      expect(lessonRepositoryMock.orderBy).toHaveBeenCalledWith(
        'lesson.id',
        'ASC',
      );
      expect(lessonRepositoryMock.getMany).toHaveBeenCalled();
    });
  });
});
