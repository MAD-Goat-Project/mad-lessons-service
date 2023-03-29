import { Injectable } from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "../models/lesson/lesson.entity";
import { Repository } from "typeorm";

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>
  ) {}
  create(createLessonDto: CreateLessonDto) {
    const newLesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(newLesson);
  }

  findAll() {
    return this.lessonRepository.find();
  }

  findOne(id: number) {
    return this.lessonRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.lessonRepository.update(id, updateLessonDto);
  }

  remove(id: number) {
    return this.lessonRepository.delete(id);
  }
}
