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
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('lessons/:lesson/assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
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
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findAll(@Param('lesson', ParseIntPipe) lessonId: number) {
    return this.assessmentsService.findAllByLessonId(lessonId);
  }

  @Get(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findOne(@Param('id') id: number) {
    return this.assessmentsService.findOne(+id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
    return this.assessmentsService.update(+id, updateAssessmentDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  remove(@Param('id') id: number) {
    return this.assessmentsService.remove(+id);
  }
}
