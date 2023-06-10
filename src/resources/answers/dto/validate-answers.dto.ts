import { IsNotEmpty, IsString } from 'class-validator';

export class validateAnswersDto {
  @IsNotEmpty()
  @IsString({ each: true })
  answers: string[];
}
