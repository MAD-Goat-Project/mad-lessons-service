import { Injectable } from '@nestjs/common';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLessonProgressEntity } from '../../models/entitities';

@Injectable()
export class LessonProgressService {
  constructor(
    @InjectRepository(UserLessonProgressEntity)
    private readonly userLessonProgressRepository: Repository<UserLessonProgressEntity>,
  ) {}

  // TODO: Validate that the same user cannot have the same lesson progress twice
  // TODO: Validate that the user is not able to create an assessment progress for an assessment that does not exist
  // TODO: Validate that the user is not able to create an assessment progress for an assessment that is not assigned to them

  create(createLessonProgressDto: CreateLessonProgressDto) {
    const newLessonProgress = this.userLessonProgressRepository.create(
      createLessonProgressDto,
    );
    return this.userLessonProgressRepository.save(newLessonProgress);
  }

  findOne(id: number) {
    return this.userLessonProgressRepository.findOne({
      where: {
        id,
      },
    });
  }

  findLessonProgressByUserId(userId: string, lessonId: number) {
    return this.userLessonProgressRepository
      .createQueryBuilder('user_lesson_progress')
      .where(
        'user_lesson_progress.user_id = :userId AND user_lesson_progress.lesson_id = :lessonId',
        { userId, lessonId },
      )
      .getOne();
  }

  update(id: number, updateLessonProgressDto: UpdateLessonProgressDto) {
    return this.userLessonProgressRepository.update(
      id,
      updateLessonProgressDto,
    );
  }

  remove(id: number) {
    return this.userLessonProgressRepository.delete(id);
  }
}
