import { IsNotEmpty, IsOptional } from 'class-validator';

export class NewTitleDto {
  @IsNotEmpty()
  title: string;
}

export class NewPostDto {
  @IsNotEmpty()
  titleId: string;

  @IsNotEmpty()
  prompt: string;

  @IsNotEmpty()
  response: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  titleId: string;

  @IsOptional()
  prompt?: string;

  @IsOptional()
  response?: string;
}
