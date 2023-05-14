import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { validateAnswerDto } from './dto/validate-answer.dto';

@Controller('assessments/:assessment/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(
    @Param('assessment', ParseIntPipe) assessmentId: number,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    if (assessmentId !== createAnswerDto.assessment_id) {
      throw new BadRequestException('lesson_id does not match lesson in URL');
    }

    return this.answersService.create(createAnswerDto);
  }

  @Get()
  findAll(@Param('assessment', ParseIntPipe) assessmentId: number) {
    return this.answersService.findAllByAssessmentId(assessmentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('validate')
  validate(
    @Param('assessment', ParseIntPipe) assessmentId: number,
    @Body() body: validateAnswerDto,
  ) {
    return this.answersService.validateAnswer(assessmentId, body);
  }
}
