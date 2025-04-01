import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  Request,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guards';
import { User } from '@prisma/client';
import { Response } from 'express';

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
  async login(
    @Body() formdata: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(formdata);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return { message: 'Login successful' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logout successful' };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Request() req) {
    // console.log(req.user);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return req.user as User;
  }
}
