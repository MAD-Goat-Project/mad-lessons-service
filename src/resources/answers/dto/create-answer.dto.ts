import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  /**
   * Answer assessment id
   * @type {number}
   */
  @IsNotEmpty()
  @IsNumber()
  assessment_id: number;

  /**
   * Answer description
   * @type {string}
   */

  @IsNotEmpty()
  @IsString()
  description: string;
}
