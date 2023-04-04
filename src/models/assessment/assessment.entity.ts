import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAssessment } from './assessment.interface';
import { LessonEntity } from '../lesson/lesson.entity';

@Entity('assessment')
export class AssessmentEntity implements IAssessment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @ManyToOne(() => LessonEntity)
  lesson: number;

  @Column({ type: 'varchar', length: 25 })
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
