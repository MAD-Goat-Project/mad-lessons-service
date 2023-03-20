/**
 * User assessment progress interface
 * @interface
 */

export interface IUserAssessmentProgress {
  id: number;
  assessment_id: number;
  user_id: string;
  status: number;
}
