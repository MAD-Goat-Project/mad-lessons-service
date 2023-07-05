import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerEntity } from '../../models/answer/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateAnswersDto } from './dto/validate-answers.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

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

  async validateAnswers(
    assessmentId: number,
    answersArray: validateAnswersDto,
  ) {
    const answerFromDB = await this.answerRepository
      .createQueryBuilder('answer')
      .where('answer.assessment_id = :assessmentId', { assessmentId })
      .orderBy('answer.id', 'ASC')
      .getOne();

    if (!answerFromDB) {
      Logger.error(
        `Answer not found for the provided assessment ${assessmentId}`,
      );
      throw new NotFoundException(
        'Answer not found for the provided assessment',
      );
    }

    const lowercaseCorrectAnswers = new Set(
      answerFromDB.correct_answers.map((answer) => answer.toLowerCase()),
    );
    const lowercaseProvidedAnswers = new Set(
      answersArray.answers.map((answer) => answer.toLowerCase()),
    );

    const isCorrect =
      lowercaseCorrectAnswers.size === lowercaseProvidedAnswers.size &&
      [...lowercaseProvidedAnswers].every((answer) =>
        lowercaseCorrectAnswers.has(answer),
      );

    return {
      isCorrect,
    };
  }
}
