import { Module } from '@nestjs/common';
import { AssessmentProgressService } from './assessment-progress.service';
import { AssessmentProgressController } from './assessment-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAssessmentProgressEntity } from '../../models/entitities';

@Module({
  controllers: [AssessmentProgressController],
  providers: [AssessmentProgressService],
  imports: [TypeOrmModule.forFeature([UserAssessmentProgressEntity])],
})
export class AssessmentProgressModule {}
