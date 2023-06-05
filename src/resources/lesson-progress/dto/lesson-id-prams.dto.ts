import { IsInt } from 'class-validator';

// TODO: Do the same for the other DTOs
export class LessonIdParams {
  @IsInt()
  id: number;
}
