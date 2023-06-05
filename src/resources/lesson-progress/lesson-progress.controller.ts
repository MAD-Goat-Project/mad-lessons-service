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

@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createLessonProgressDto: CreateLessonProgressDto) {
    return this.lessonProgressService.create(createLessonProgressDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonProgressService.findOne(id);
  }

  // TODO: Validate SSRF
  @Get('user/:userId/lesson/:lessonId')
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
  update(
    @Param('id') id: string,
    @Body() updateLessonProgressDto: UpdateLessonProgressDto,
  ) {
    return this.lessonProgressService.update(+id, updateLessonProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonProgressService.remove(+id);
  }
}
