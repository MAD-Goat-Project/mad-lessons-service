import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from '../models/lesson/lesson.entity';
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

  async create(createLessonDto: CreateLessonDto) {
    //TODO : Improve Exceptions
    const category = await this.categoryService.findOne(
      createLessonDto.category_id,
    );

    if (!category) {
      throw new HttpException('Invalid category ID', HttpStatus.BAD_REQUEST);
    }

    const newLesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(newLesson);
  }

  findAll(category_id: number) {
    return this.lessonRepository
      .createQueryBuilder('lesson')
      .where('lesson.category_id = :category_id', { category_id })
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
