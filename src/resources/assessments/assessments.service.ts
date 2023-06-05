import { Injectable } from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentEntity } from '../../models/entitities';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(AssessmentEntity)
    private readonly assessmentRepository: Repository<AssessmentEntity>,
  ) {}

  create(createAssessmentDto: CreateAssessmentDto) {
    const newAssessment = this.assessmentRepository.create(createAssessmentDto);
    return this.assessmentRepository.save(newAssessment);
  }

  findAll() {
    return this.assessmentRepository.find();
  }

  findOne(id: number) {
    return this.assessmentRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateAssessmentDto: UpdateAssessmentDto) {
    return this.assessmentRepository.update(id, updateAssessmentDto);
  }

  remove(id: number) {
    return this.assessmentRepository.delete(id);
  }

  findAllByLessonId(lesson_id: number) {
    return this.assessmentRepository
      .createQueryBuilder('assessment')
      .select([
        'assessment.id',
        'assessment.lesson_id',
        'assessment.type',
        'assessment.description',
        'assessment.goal',
      ])
      .where('assessment.lesson_id = :lesson_id', { lesson_id })
      .orderBy('assessment.id', 'ASC')
      .getMany()
      .then((assessments) => {
        return assessments.map((assessment) => ({
          ...assessment,
          id: Number(assessment.id), // Convert the id to number
          // TODO: This is a hack that doesn't make sense. Fix this.
        }));
      });
  }
}
