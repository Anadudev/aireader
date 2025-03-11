import { IsNotEmpty, IsOptional } from 'class-validator';

export class NewTitleDto {
  @IsNotEmpty()
  title: string;
}

class ChatDto {
  @IsNotEmpty()
  prompt: string;
  @IsNotEmpty()
  response: string;
  @IsOptional()
  chatId?: string;
}

export class NewPostDto {
  @IsNotEmpty()
  titleId: string;

  @IsNotEmpty()
  chats: ChatDto[];
}

export class UpdatePostDto {
  @IsNotEmpty()
  titleId: string;

  @IsOptional()
  prompt?: string;

  @IsOptional()
  response?: string;
}
