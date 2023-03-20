import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssessmentEntity } from '../assessment/assessment.entity';
import { IAnswer } from './answer.interface';

@Entity('answer')
export class AnswerEntity implements IAnswer {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @OneToMany((type) => AssessmentEntity, (assessment) => assessment.id)
  assessment_id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
