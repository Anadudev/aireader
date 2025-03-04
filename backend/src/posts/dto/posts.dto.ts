import { IsNotEmpty, IsOptional } from 'class-validator';

export class NewPostDto {
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  prompt: string;

  @IsNotEmpty()
  response: string;
}

export class UpdatePostDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  response?: string;
}
