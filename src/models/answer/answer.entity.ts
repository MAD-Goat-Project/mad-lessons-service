import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssessmentEntity } from '../assessment/assessment.entity';
import { IAnswer } from './answer.interface';

@Entity('answer')
export class AnswerEntity implements IAnswer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => AssessmentEntity)
  @JoinColumn({ name: 'assessment_id', referencedColumnName: 'id' })
  assessment_id: number;

  @Column({ type: 'text' })
  description: string;

  @Column('text', { array: true, default: '{}', nullable: true })
  correct_answers: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
