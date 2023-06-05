import { Module } from '@nestjs/common';
import { LessonProgressService } from './lesson-progress.service';
import { LessonProgressController } from './lesson-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLessonProgressEntity } from '../../models/entitities';

@Module({
  controllers: [LessonProgressController],
  providers: [LessonProgressService],
  imports: [TypeOrmModule.forFeature([UserLessonProgressEntity])],
  exports: [LessonProgressService],
})
export class LessonProgressModule {}
