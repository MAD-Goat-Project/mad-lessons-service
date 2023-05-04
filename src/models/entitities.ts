import { CategoryEntity } from './category/category.entity';
import { AnswerEntity } from './answer/answer.entity';
import { AssessmentEntity } from './assessment/assessment.entity';
import { HintEntity } from './hint/hint.entity';
import { LessonEntity } from './lesson/lesson.entity';
import { UserAssessmentProgressEntity } from './user-assessment-progress/user-assessment-progress.entity';
import { UserLessonProgressEntity } from './user-lesson-progress/user-lesson-progress.entity';

// TODO: Add all entities here
const entities = [CategoryEntity, LessonEntity, AssessmentEntity];

export {
  AnswerEntity,
  AssessmentEntity,
  CategoryEntity,
  HintEntity,
  LessonEntity,
  UserAssessmentProgressEntity,
  UserLessonProgressEntity,
};
export default entities;
