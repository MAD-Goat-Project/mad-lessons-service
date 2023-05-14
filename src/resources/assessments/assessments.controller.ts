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
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Controller('lessons/:lesson/assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(
    @Param('lesson', ParseIntPipe) lessonId: number,
    @Body() createAssessmentDto: CreateAssessmentDto,
  ) {
    if (lessonId !== createAssessmentDto.lesson_id) {
      throw new BadRequestException('lesson_id does not match lesson in URL');
    }
    return this.assessmentsService.create(createAssessmentDto);
  }

  @Get()
  findAll(@Param('lesson', ParseIntPipe) lessonId: number) {
    return this.assessmentsService.findAllByLessonId(lessonId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.assessmentsService.findOne(+id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
    return this.assessmentsService.update(+id, updateAssessmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.assessmentsService.remove(+id);
  }
}
