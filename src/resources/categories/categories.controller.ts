import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  async findAll(@Query('name') name: string) {
    return this.categoriesService.findAll(name);
  }

  @Get(':id')
  @Roles({ roles: ['realm:app-user'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:app-admin'], mode: RoleMatchingMode.ALL })
  @UsePipes(ValidationPipe)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
