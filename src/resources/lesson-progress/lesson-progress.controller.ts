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
import { LessonProgressService } from './lesson-progress.service';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @UsePipes(ValidationPipe)
  @Post()
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  create(@Body() createLessonProgressDto: CreateLessonProgressDto) {
    return this.lessonProgressService.create(createLessonProgressDto);
  }

  @Get(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonProgressService.findOne(id);
  }

  // TODO: Validate SSRF
  @Get('user/:userId/lesson/:lessonId')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  findLessonProgressByUserId(
    @Param('userId') userId: string,
    @Param('lessonId', ParseIntPipe) lessonId: number,
  ) {
    return this.lessonProgressService.findLessonProgressByUserId(
      userId,
      lessonId,
    );
  }

  @Patch(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  update(
    @Param('id') id: string,
    @Body() updateLessonProgressDto: UpdateLessonProgressDto,
  ) {
    return this.lessonProgressService.update(+id, updateLessonProgressDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  remove(@Param('id') id: string) {
    return this.lessonProgressService.remove(+id);
  }
}
