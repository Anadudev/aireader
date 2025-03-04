import {
  Controller,
  Post,
  HttpCode,
  Body,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guards';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @HttpCode(200)
  @Post('signup')
  async signup(@Body() formdata: SignupDto) {
    const user = await this.authService.signup(formdata);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() formdata: SignupDto) {
    return await this.authService.login(formdata);
  }

  @UseGuards(AuthGuard)
  @Post('profile')
  profile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return req.user as User;
  }
}
