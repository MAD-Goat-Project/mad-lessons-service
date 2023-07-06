import { IsNotEmpty, IsNumber } from 'class-validator';
import { AssessmentStatus } from '../../../models/user-assessment-progress/user-assessment-progress.interface';

export class CreateAssessmentProgressDto {
  @IsNumber()
  @IsNotEmpty()
  assessment_id: number;

  @IsNumber()
  @IsNotEmpty()
  status: AssessmentStatus;
}
