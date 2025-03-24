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
import { PrismaConfigService } from 'src/config/prisma.config.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaConfigService,
  ) {}

  async signup(data: NewUser) {
    const user = await this.userService.create(data);
    if (user) {
      return user;
    }
    throw new HttpException('Signup unsuccessful', 500);
  }

  async login(data: NewUser) {
    // try {
    const user = await this.prisma.user.findUnique({
      where: { username: data.username },
      include: { accounts: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const { accounts, ...userWithoutAccounts } = user;

    if (accounts[0]) {
      const isPasswordValid = await bcrypt.compare(
        data.password,
        accounts[0].password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      return {
        access_token: await this.jwtService.signAsync(userWithoutAccounts),
      };
    }
    throw new UnauthorizedException('Invalid Credentials');
    // } catch (error) {
    //   console.error(`[login]: ${error}`);
    //   errorMessages.SERVER_ERROR(error);
    // }
  }
}
