import { HttpException, Injectable } from '@nestjs/common';
import { errorMessages } from 'errors/error-messages';
import { PrismaConfigService } from 'src/config/prisma.config.service';
import { NewUser, UpdateUser } from 'src/types/userFields.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaConfigService) {}

  async findOneById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      console.error(`[findOne]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async findOneByUsername(username: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { username } });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      console.error(`[findOne]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async findAll(take = 10, skip?: number) {
    try {
      if (take < 1) take = 1;
      if (skip && skip < 0) skip = 0;
      const users = await this.prisma.user.findMany({ take, skip });
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
      console.error(`[delete]: ${error}`);
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
      // todo: hash password before saving to db
      data.password = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({ data });
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      return user;
    } catch (error) {
      console.error(`[create]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }
}
