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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CategoriesService } from '../categories/categories.service';

@Controller('categories/:category/lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll(@Param('category', ParseIntPipe) category: number) {
    return this.lessonsService.findAll(category);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: number) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
