import { IsInt } from 'class-validator';

export class LessonIdParams {
  @IsInt()
  id: number;
}
