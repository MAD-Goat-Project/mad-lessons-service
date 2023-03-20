/**
 * User lesson progress interface
 * @interface
 */

export interface IUserLessonProgress {
  id: number;
  lesson_id: number;
  user_id: string;
  status: number;
}
