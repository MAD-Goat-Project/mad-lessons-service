import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerEntity } from '../../models/answer/answer.entity';
import { NotFoundException } from '@nestjs/common';

describe('AnswersService', () => {
  let service: AnswersService;
  let answerRepositoryMock: any;

  beforeEach(async () => {
    answerRepositoryMock = {
      createQueryBuilder: jest.fn(() => answerRepositoryMock),
      where: jest.fn(() => answerRepositoryMock),
      orderBy: jest.fn(() => answerRepositoryMock),
      getOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(AnswerEntity),
          useValue: answerRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateAnswers', () => {
    it('should throw NotFoundException if answer is not found for the provided assessment', async () => {
      // Arrange
      const assessmentId = 1;
      answerRepositoryMock.getOne.mockResolvedValueOnce(undefined);

      // Act & Assert
      await expect(
        service.validateAnswers(assessmentId, { answers: [] }),
      ).rejects.toThrowError(NotFoundException);
      expect(answerRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'answer',
      );
      expect(answerRepositoryMock.where).toHaveBeenCalledWith(
        'answer.assessment_id = :assessmentId',
        { assessmentId },
      );
      expect(answerRepositoryMock.orderBy).toHaveBeenCalledWith(
        'answer.id',
        'ASC',
      );
      expect(answerRepositoryMock.getOne).toHaveBeenCalled();
    });

    it('should return isCorrect as true if the provided answers match the correct answers', async () => {
      // Arrange
      const assessmentId = 1;
      const answersArray = { answers: ['A', 'B', 'C'] };
      const answerFromDB = { correct_answers: ['A', 'B', 'C'] };
      answerRepositoryMock.getOne.mockResolvedValueOnce(answerFromDB);

      // Act
      const result = await service.validateAnswers(assessmentId, answersArray);

      // Assert
      expect(result).toEqual({ isCorrect: true });
      expect(answerRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'answer',
      );
      expect(answerRepositoryMock.where).toHaveBeenCalledWith(
        'answer.assessment_id = :assessmentId',
        { assessmentId },
      );
      expect(answerRepositoryMock.orderBy).toHaveBeenCalledWith(
        'answer.id',
        'ASC',
      );
      expect(answerRepositoryMock.getOne).toHaveBeenCalled();
    });

    it('should return isCorrect as false if the provided answers do not match the correct answers', async () => {
      // Arrange
      const assessmentId = 1;
      const answersArray = { answers: ['A', 'B'] };
      const answerFromDB = { correct_answers: ['A', 'B', 'C'] };
      answerRepositoryMock.getOne.mockResolvedValueOnce(answerFromDB);

      // Act
      const result = await service.validateAnswers(assessmentId, answersArray);

      // Assert
      expect(result).toEqual({ isCorrect: false });
      expect(answerRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'answer',
      );
      expect(answerRepositoryMock.where).toHaveBeenCalledWith(
        'answer.assessment_id = :assessmentId',
        { assessmentId },
      );
      expect(answerRepositoryMock.orderBy).toHaveBeenCalledWith(
        'answer.id',
        'ASC',
      );
      expect(answerRepositoryMock.getOne).toHaveBeenCalled();
    });

    it('should return isCorrect as false if the provided answers array is empty', async () => {
      // Arrange
      const assessmentId = 1;
      const answersArray = { answers: [] };
      const answerFromDB = { correct_answers: ['A', 'B', 'C'] };
      answerRepositoryMock.getOne.mockResolvedValueOnce(answerFromDB);

      // Act
      const result = await service.validateAnswers(assessmentId, answersArray);

      // Assert
      expect(result).toEqual({ isCorrect: false });
      expect(answerRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'answer',
      );
      expect(answerRepositoryMock.where).toHaveBeenCalledWith(
        'answer.assessment_id = :assessmentId',
        { assessmentId },
      );
      expect(answerRepositoryMock.orderBy).toHaveBeenCalledWith(
        'answer.id',
        'ASC',
      );
      expect(answerRepositoryMock.getOne).toHaveBeenCalled();
    });

    it('should return isCorrect as false if the provided answers array length is different from the correct answers array length', async () => {
      // Arrange
      const assessmentId = 1;
      const answersArray = { answers: ['A', 'B', 'C', 'D'] };
      const answerFromDB = { correct_answers: ['A', 'B', 'C'] };
      answerRepositoryMock.getOne.mockResolvedValueOnce(answerFromDB);

      // Act
      const result = await service.validateAnswers(assessmentId, answersArray);

      // Assert
      expect(result).toEqual({ isCorrect: false });
      expect(answerRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'answer',
      );
      expect(answerRepositoryMock.where).toHaveBeenCalledWith(
        'answer.assessment_id = :assessmentId',
        { assessmentId },
      );
      expect(answerRepositoryMock.orderBy).toHaveBeenCalledWith(
        'answer.id',
        'ASC',
      );
      expect(answerRepositoryMock.getOne).toHaveBeenCalled();
    });

    it('should return isCorrect as true if the provided answers match the correct answers case-insensitively', async () => {
      // Arrange
      const assessmentId = 1;
      const answersArray = { answers: ['a', 'B', 'C'] };
      const answerFromDB = { correct_answers: ['A', 'b', 'c'] };
      answerRepositoryMock.getOne.mockResolvedValueOnce(answerFromDB);

      // Act
      const result = await service.validateAnswers(assessmentId, answersArray);

      // Assert
      expect(result).toEqual({ isCorrect: true });
      expect(answerRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'answer',
      );
      expect(answerRepositoryMock.where).toHaveBeenCalledWith(
        'answer.assessment_id = :assessmentId',
        { assessmentId },
      );
      expect(answerRepositoryMock.orderBy).toHaveBeenCalledWith(
        'answer.id',
        'ASC',
      );
      expect(answerRepositoryMock.getOne).toHaveBeenCalled();
    });
  });
});
