import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NewUser } from 'src/types/userFields.types';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { errorMessages } from 'errors/error-messages';
import { JwtService } from '@nestjs/jwt';
import { Account, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(data: NewUser) {
    try {
      const user = await this.userService.create(data);
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      return user;
    } catch (error) {
      errorMessages.SERVER_ERROR(error);
    }
  }

  async login(data: NewUser) {
    // try {
    const user = await this.userService.findOneByUsername(data.username, {
      accounts: true,
    });
    if (!user || !user.accounts || !user.accounts[0]) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user?.accounts[0].password as string,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return { access_token: await this.jwtService.signAsync(user) };
    // } catch (error) {
    //   console.error(`[login]: ${error}`);
    //   errorMessages.SERVER_ERROR(error);
    // }
  }
}
