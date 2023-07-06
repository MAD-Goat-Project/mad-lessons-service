import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from '../../models/entitities';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @Inject(CategoriesService)
    private readonly categoryService: CategoriesService,
  ) {}

  async create(category: number, createLessonDto: CreateLessonDto) {
    const categoryExists = await this.categoryService.findOne(
      createLessonDto.category_id,
    );

    if (!categoryExists && createLessonDto.category_id !== category) {
      Logger.error(
        `Category with ID ${createLessonDto.category_id} does not exist`,
      );
      throw new HttpException('Invalid category ID', HttpStatus.BAD_REQUEST);
    }

    const newLesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(newLesson);
  }

  async findAll(category_id: number) {
    // Validate that the category exists
    const categoryExists = await this.categoryService.findOne(category_id);
    if (!categoryExists) {
      throw new HttpException('Invalid category ID', HttpStatus.BAD_REQUEST);
    }
    return this.lessonRepository
      .createQueryBuilder('lesson')
      .where('lesson.category_id = :category_id', { category_id })
      .orderBy('lesson.id', 'ASC')
      .getMany();
  }

  findOne(id: number) {
    return this.lessonRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.lessonRepository.update(id, updateLessonDto);
  }

  remove(id: number) {
    return this.lessonRepository.delete(id);
  }
}
