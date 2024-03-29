/**
 * Lesson Interface
 * @interface
 */

export interface ILesson {
  id: number;
  category_id: number;
  name: string;
  description: string;
  image_src: string;
  image_alt: string;
}
