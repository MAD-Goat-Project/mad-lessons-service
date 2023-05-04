import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { AssessmentType } from '../../models/assessment/assessment.interface';

export class CreateAssessmentDto {
  @IsNotEmpty()
  @IsNumber()
  lesson_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  type: AssessmentType;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  goal: string;
}
