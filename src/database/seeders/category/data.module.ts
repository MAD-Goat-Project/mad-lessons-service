import { CategoryEntity } from "../../../models/entitities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IDataService } from "./data.service";
import { Module } from "@nestjs/common";
import { LessonEntity } from "../../../models/lesson/lesson.entity";

/**
 * Import and provide seeder classes for categories.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, LessonEntity])],
  //providers: [{ provide: IDataService, useClass: DataService }],
  exports: [IDataService],
})
export class CategorySeederModule {}
