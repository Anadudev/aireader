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
    const user = await this.userService.findOneByUsername(data.username);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const { password, ...result } = user;
    const isPasswordValid = await bcrypt.compare(data.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return { access_token: await this.jwtService.signAsync(result) };
    // } catch (error) {
    //   console.error(`[login]: ${error}`);
    //   errorMessages.SERVER_ERROR(error);
    // }
  }
}
