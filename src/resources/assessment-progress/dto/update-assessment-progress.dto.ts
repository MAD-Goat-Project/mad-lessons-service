import { PartialType } from '@nestjs/mapped-types';
import { CreateAssessmentProgressDto } from './create-assessment-progress.dto';

export class UpdateAssessmentProgressDto extends PartialType(
  CreateAssessmentProgressDto,
) {}
