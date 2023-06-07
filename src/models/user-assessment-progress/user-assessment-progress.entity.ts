import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssessmentEntity } from '../assessment/assessment.entity';
import { IUserAssessmentProgress } from './user-assessment-progress.interface';

@Entity('user_assessment_progress')
@Index(
  'idx_user_assessment_progress_unique',
  ['user_id', 'assessment_id', 'status'],
  {
    unique: true,
  },
)
export class UserAssessmentProgressEntity implements IUserAssessmentProgress {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => AssessmentEntity)
  @JoinColumn({ name: 'assessment_id', referencedColumnName: 'id' })
  assessment_id: number;

  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
