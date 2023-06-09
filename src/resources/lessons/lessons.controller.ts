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
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('categories/:category/lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  async create(
    @Param('category', ParseIntPipe) category: number,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.create(category, createLessonDto);
  }

  @Get()
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  findAll(@Param('category', ParseIntPipe) category: number) {
    return this.lessonsService.findAll(category);
  }

  @Get(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: number) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
