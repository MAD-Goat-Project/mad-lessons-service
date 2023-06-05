import {
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
import { AssessmentProgressService } from './assessment-progress.service';
import { CreateAssessmentProgressDto } from './dto/create-assessment-progress.dto';
import { UpdateAssessmentProgressDto } from './dto/update-assessment-progress.dto';

@Controller('assessment-progress')
export class AssessmentProgressController {
  constructor(
    private readonly assessmentProgressService: AssessmentProgressService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createAssessmentProgressDto: CreateAssessmentProgressDto) {
    return this.assessmentProgressService.create(createAssessmentProgressDto);
  }

  @Get()
  findAll() {
    return this.assessmentProgressService.findAll();
  }

  // TODO: Add ParseInt to all get requests for id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.assessmentProgressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssessmentProgressDto: UpdateAssessmentProgressDto,
  ) {
    return this.assessmentProgressService.update(
      +id,
      updateAssessmentProgressDto,
    );
  }

  //TODO: Validate SSRF
  @Get('user/:userId/assessment/:assessmentId')
  findAssessmentProgressByUserId(
    @Param('userId') userId: string,
    @Param('assessmentId', ParseIntPipe) assessmentId: number,
  ) {
    return this.assessmentProgressService.findAssessmentProgressByUserId(
      userId,
      assessmentId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assessmentProgressService.remove(+id);
  }
}
