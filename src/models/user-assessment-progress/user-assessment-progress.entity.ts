import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AssessmentEntity } from "../assessment/assessment.entity";
import { IUserAssessmentProgress } from "./user-assessment-progress.interface";

@Entity('user_assessment_progress')
export class UserAssessmentProgressEntity implements IUserAssessmentProgress {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @OneToMany((type) => AssessmentEntity, (assessment) => assessment.id)
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
