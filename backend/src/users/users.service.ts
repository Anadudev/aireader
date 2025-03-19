import { HttpException, Injectable } from '@nestjs/common';
import { errorMessages } from 'errors/error-messages';
import { PrismaConfigService } from 'src/config/prisma.config.service';
import { UserInclude, NewUser, UpdateUser } from 'src/types/userFields.types';
import * as bcrypt from 'bcrypt';
import { QueryType } from 'src/types/query.types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaConfigService) {}

  async findOne(id: string, toInclude?: UserInclude) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ id }, { username: id }],
        },
        include: {
          accounts: Boolean(toInclude?.accounts || false),
          titles: toInclude?.titles && {
            include: {
              posts: Boolean(toInclude?.posts || false),
            },
          },
        },
      });
      // console.log(user, toInclude);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      console.error(`[findOne]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async findAll(query?: QueryType) {
    try {
      const users = await this.prisma.user.findMany({
        take: Number(query?.take || 10),
        skip: Number(query?.skip || 0),
      });
      if (!users) {
        throw new HttpException('Users not found', 404);
      }
      return users;
    } catch (error) {
      console.error(`[findAll]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async delete(id: string) {
    try {
      const user = await this.prisma.user.delete({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      console.error(`[delete]: ${error.code} ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async update(id: string, data: UpdateUser) {
    try {
      const user = await this.prisma.user.update({ where: { id }, data });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
    } catch (error) {
      console.error(`[update]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async create(data: NewUser) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          username: data.username,
          accounts: { create: { password: data.password } },
        },
      });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      console.error(`[create]: ${error.code} ${error}`);
      if (error.code == 'P2002') {
        throw new HttpException('User already exists', 409);
      }
      errorMessages.SERVER_ERROR(error);
    }
  }
}
