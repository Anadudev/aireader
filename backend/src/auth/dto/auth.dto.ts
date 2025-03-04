import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  // todo: uncomment password validation before production
  // @IsStrongPassword()
  password: string;
}
