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
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('assessment-progress')
export class AssessmentProgressController {
  constructor(
    private readonly assessmentProgressService: AssessmentProgressService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  create(@Body() createAssessmentProgressDto: CreateAssessmentProgressDto) {
    return this.assessmentProgressService.create(createAssessmentProgressDto);
  }

  @Get()
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findAll() {
    return this.assessmentProgressService.findAll();
  }

  // TODO: Add ParseInt to all get requests for id
  @Get(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.assessmentProgressService.findOne(+id);
  }

  @Patch(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
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
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
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
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  remove(@Param('id') id: string) {
    return this.assessmentProgressService.remove(+id);
  }
}
