import { Inject, Injectable } from '@nestjs/common';
import { CreateAssessmentProgressDto } from './dto/create-assessment-progress.dto';
import { UpdateAssessmentProgressDto } from './dto/update-assessment-progress.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAssessmentProgressEntity } from '../../models/user-assessment-progress/user-assessment-progress.entity';
import { RabbitMQService } from '../../providers/rabbit-mq/rabbit-mq.provider.service';

@Injectable()
export class AssessmentProgressService {
  constructor(
    @InjectRepository(UserAssessmentProgressEntity)
    private readonly assessmentProgressRepository: Repository<UserAssessmentProgressEntity>,
    @Inject(RabbitMQService)
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  // TODO: Validate that the same user cannot have the same assessment progress twice
  // TODO: Validate that the user is not able to create an assessment progress for an assessment that does not exist
  // TODO: Validate that the user is not able to create an assessment progress for an assessment that is not assigned to them

  async create(
    createAssessmentProgressDto: CreateAssessmentProgressDto,
    userId: string,
  ) {
    const newAssessmentProgress = this.assessmentProgressRepository.create({
      ...createAssessmentProgressDto,
      user_id: userId,
    });
    return this.assessmentProgressRepository.save(newAssessmentProgress);
  }

  findAll() {
    return this.assessmentProgressRepository.find();
  }

  findOne(id: number) {
    return this.assessmentProgressRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateAssessmentProgressDto: UpdateAssessmentProgressDto) {
    return this.assessmentProgressRepository.update(
      id,
      updateAssessmentProgressDto,
    );
  }

  remove(id: number) {
    return this.assessmentProgressRepository.delete(id);
  }

  findAssessmentProgressByUserId(userId: string, assessmentId: number) {
    return this.assessmentProgressRepository
      .createQueryBuilder('user_assessment_progress')
      .where(
        'user_assessment_progress.user_id = :userId AND user_assessment_progress.assessment_id = :assessmentId',
        { userId, assessmentId },
      )
      .getOne();
  }

  async sendAssessmentCompletedMessage(assessmentId: number, userId: string) {
    this.rabbitMQService.send('lesson.completed', {
      assessmentId,
      userId,
    });
  }
}
