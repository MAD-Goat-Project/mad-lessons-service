import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "../category/category.entity";
import { IUserLessonProgress } from "./user-lesson-progress.interface";

@Entity('user_lesson_progress')
export class UserLessonProgressEntity implements IUserLessonProgress {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @OneToMany((type) => CategoryEntity, (category) => category.id)
  lesson_id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
