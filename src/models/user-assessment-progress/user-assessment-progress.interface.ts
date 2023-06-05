export enum AssessmentStatus {
  NOT_STARTED = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}

/**
 * User assessment progress interface
 * @interface
 */

export interface IUserAssessmentProgress {
  id: number;
  assessment_id: number;
  user_id: string;
  status: AssessmentStatus;
}
