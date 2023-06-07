import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUserLessonProgress } from './user-lesson-progress.interface';
import { LessonEntity } from '../lesson/lesson.entity';

@Entity('user_lesson_progress')
@Index('idx_user_lesson_progress_unique', ['user_id', 'lesson_id', 'status'], {
  unique: true,
})
export class UserLessonProgressEntity implements IUserLessonProgress {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => LessonEntity)
  @JoinColumn({ name: 'lesson_id', referencedColumnName: 'id' })
  lesson_id: number;

  /**
   * Keycloak user subscription id
   */
  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
