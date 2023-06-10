/**
 * Answer interface
 * @interface
 */

export interface IAnswer {
  id: number;
  assessment_id: number;
  description: string;
  correct_answers: string[];
}
