import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IHint } from "./hint.interface";
import { AssessmentEntity } from "../assessment/assessment.entity";

@Entity('hint')
export class HintEntity implements IHint {
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
