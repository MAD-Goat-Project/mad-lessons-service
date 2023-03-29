import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLessonDto  {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsString()
  image_src: string;

  @IsNotEmpty()
  @IsString()
  image_alt: string;

}
