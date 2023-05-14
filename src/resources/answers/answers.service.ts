import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerEntity } from '../../models/answer/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateAnswerDto } from './dto/validate-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  // TODO: Improve exception handling
  create(createAnswerDto: CreateAnswerDto) {
    const newAnswer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(newAnswer);
  }

  findAll() {
    return this.answerRepository.find();
  }

  findOne(id: number) {
    return this.answerRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.answerRepository.update(id, updateAnswerDto);
  }

  remove(id: number) {
    return this.answerRepository.delete(id);
  }

  findAllByAssessmentId(assessmentId: number) {
    return this.answerRepository
      .createQueryBuilder('answer')
      .where('answer.assessment_id = :assessmentId', { assessmentId })
      .orderBy('answer.id', 'ASC')
      .getMany();
  }

  async validateAnswer(assessmentId: number, answerDTO: validateAnswerDto) {
    const answerFromDB = await this.answerRepository
      .createQueryBuilder('answer')
      .where('answer.assessment_id = :assessmentId', { assessmentId })
      .orderBy('answer.id', 'ASC')
      .getOne();

    if (!answerFromDB) {
      throw new NotFoundException(
        'Answer not found for the provided assessment',
      );
    }

    return {
      isCorrect: answerFromDB.description === answerDTO.answer,
    };
  }
}
