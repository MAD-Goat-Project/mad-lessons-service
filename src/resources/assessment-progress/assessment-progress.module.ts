import { Module } from '@nestjs/common';
import { AssessmentProgressService } from './assessment-progress.service';
import { AssessmentProgressController } from './assessment-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAssessmentProgressEntity } from '../../models/entitities';
import { RabbitMqProviderModule } from '../../providers/rabbit-mq/rabbit-mq.provider.module';

@Module({
  controllers: [AssessmentProgressController],
  providers: [AssessmentProgressService],
  imports: [
    TypeOrmModule.forFeature([UserAssessmentProgressEntity]),
    RabbitMqProviderModule,
  ],
})
export class AssessmentProgressModule {}
