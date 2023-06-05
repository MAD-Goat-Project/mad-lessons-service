export enum LessonStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}

/**
 * User lesson progress interface
 * @interface
 */

export interface IUserLessonProgress {
  id: number;
  lesson_id: number;
  user_id: string;
  status: LessonStatus;
}
