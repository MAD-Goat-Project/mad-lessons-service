/**
 * Lesson Interface
 * @interface
 */
import { CategoryEntity } from "../category/category.entity";

export interface ILesson {
  id: number;
  category: CategoryEntity;
  name: string;
  image_src: string;
  image_alt: string;

}
