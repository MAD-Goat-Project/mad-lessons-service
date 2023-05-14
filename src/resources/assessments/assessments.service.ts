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
      .where('assessment.lesson_id = :lesson_id', { lesson_id })
      .orderBy('assessment.id', 'ASC')
      .getMany();
  }
}
