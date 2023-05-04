import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentEntity } from '../models/entitities';

@Module({
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
  imports: [TypeOrmModule.forFeature([AssessmentEntity])],
})
export class AssessmentsModule {}
