import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AssessmentStatus } from '../../../models/user-assessment-progress/user-assessment-progress.interface';

export class CreateAssessmentProgressDto {
  @IsNumber()
  @IsNotEmpty()
  assessment_id: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  @IsNotEmpty()
  status: AssessmentStatus;
}
