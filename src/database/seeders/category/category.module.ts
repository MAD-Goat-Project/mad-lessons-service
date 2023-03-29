import { CategoryEntity } from "../../../models";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategorySeederService } from "./category.service";
import { Module } from "@nestjs/common";

/**
 * Import and provide seeder classes for categories.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategorySeederService],
  exports: [CategorySeederService],
})
export class CategorySeederModule {}