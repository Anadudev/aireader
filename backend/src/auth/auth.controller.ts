import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
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
  async signup(@Body() formdata: AuthDto) {
    const user = await this.authService.signup(formdata);
    // if (!user) {
    //   throw new HttpException('User not found', 404);
    // }
    return user;
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() formdata: AuthDto) {
    return await this.authService.login(formdata);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return req.user as User;
  }
}
