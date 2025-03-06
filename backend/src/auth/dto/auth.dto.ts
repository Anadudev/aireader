import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  // todo: uncomment password validation before production
  // @IsStrongPassword()
  password: string;
}

export class RefreshDto {
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
