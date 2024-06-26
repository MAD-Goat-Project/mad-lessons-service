import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import {
  AuthenticatedUser,
  RoleMatchingMode,
  Roles,
} from 'nest-keycloak-connect';
import { AssessmentStatus } from '../../models/user-assessment-progress/user-assessment-progress.interface';

@Controller('assessment-progress')
export class AssessmentProgressController {
  constructor(
    private readonly assessmentProgressService: AssessmentProgressService,
  ) {}

  // TODO: Validate that we cannot update the same assessment twice
  // TODO: Remove the userID from the body and use the authenticated user instead
  @UsePipes(ValidationPipe)
  @Post()
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  async create(
    @Body() createAssessmentProgressDto: CreateAssessmentProgressDto,
    @AuthenticatedUser() user: any,
  ) {
    const createdProgress = await this.assessmentProgressService.create(
      createAssessmentProgressDto,
      user.sub,
    );

    if (createAssessmentProgressDto.status === AssessmentStatus.COMPLETED) {
      Logger.log(
        `Sending assessment completed message for assessment ${createAssessmentProgressDto.assessment_id} and user ${user.sub}`,
        'AssessmentProgressController',
      );
      await this.assessmentProgressService.sendAssessmentCompletedMessage(
        createAssessmentProgressDto.assessment_id,
        user.sub,
      );
    }

    return createdProgress;
  }

  @Get()
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findAll() {
    return this.assessmentProgressService.findAll();
  }

  @Get(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.assessmentProgressService.findOne(+id);
  }

  @Patch(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateAssessmentProgressDto: UpdateAssessmentProgressDto,
  ) {
    return this.assessmentProgressService.update(
      +id,
      updateAssessmentProgressDto,
    );
  }

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
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.assessmentProgressService.remove(+id);
  }
}
