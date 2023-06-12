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
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { validateAnswersDto } from './dto/validate-answers.dto';

@Controller('assessments/:assessment/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
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
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findAll(@Param('assessment', ParseIntPipe) assessmentId: number) {
    return this.answersService.findAllByAssessmentId(assessmentId);
  }

  @Get(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }

  @UsePipes(ValidationPipe)
  @Post('validation')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  validateAnswers(
    @Param('assessment', ParseIntPipe) assessmentId: number,
    @Body() body: validateAnswersDto,
  ) {
    return this.answersService.validateAnswers(assessmentId, body);
  }
}
