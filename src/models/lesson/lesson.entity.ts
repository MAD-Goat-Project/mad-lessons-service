import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ILesson } from './lesson.interface';
import { CategoryEntity } from '../category/category.entity';

@Entity('lesson')
export class LessonEntity implements ILesson {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  //@OneToMany(() => AssessmentEntity, assessment => assessment.lesson)
  id: number;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category_id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  image_src: string;

  @Column({ type: 'varchar', length: 255 })
  image_alt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
