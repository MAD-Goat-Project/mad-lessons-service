import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonEntity } from "../models/lesson/lesson.entity";

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [TypeOrmModule.forFeature([LessonEntity])],
})
export class LessonsModule {}
