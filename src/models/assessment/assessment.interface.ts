export enum AssessmentType {
  INTRODUCTION = 1,
  QUESTION_ANSWER = 2,
  QUIZ,
  CONCLUSION = 10,
}

/**
 * Assessment interface
 * @interface
 */
export interface IAssessment {
  id: number;
  lesson_id: number;
  type: AssessmentType;
  description: string;
  goal: string;
}
