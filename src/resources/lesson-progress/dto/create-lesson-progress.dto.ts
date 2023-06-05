import { LessonStatus } from '../../../models/user-lesson-progress/user-lesson-progress.interface';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLessonProgressDto {
  @IsNumber()
  @IsNotEmpty()
  lesson_id: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  @IsNotEmpty()
  status: LessonStatus;
}
