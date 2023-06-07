import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssessmentType, IAssessment } from './assessment.interface';
import { LessonEntity } from '../lesson/lesson.entity';

@Entity('assessment')
export class AssessmentEntity implements IAssessment {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => LessonEntity)
  @JoinColumn({ name: 'lesson_id', referencedColumnName: 'id' })
  lesson_id: number;

  @Column({ type: 'int' })
  type: AssessmentType;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  goal: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
