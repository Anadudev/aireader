import { HttpException, Injectable } from '@nestjs/common';
import { errorMessages } from 'errors/error-messages';
import { PrismaConfigService } from 'src/config/prisma.config.service';
import {
  NewTitleType,
  PostInclude,
  UpdateTitleType,
} from 'src/types/postFields.types';

@Injectable()
export class TitlesService {
  constructor(private prisma: PrismaConfigService) {}

  async titleCreate(titlePayload: NewTitleType) {
    try {
      const title = await this.prisma.title.create({
        data: titlePayload,
      });
      if (!title) {
        throw new HttpException('Failed to create title', 500);
      }
      return title;
    } catch (error) {
      console.error(`[titleCreate]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async titleFindAll(take = 10, skip?: number, include?: PostInclude) {
    try {
      if (take < 1) take = 1;
      if (skip && skip < 0) skip = 0;
      const titles = await this.prisma.title.findMany({ take, skip, include });
      return titles;
    } catch (error) {
      console.error(`[postFindAll]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }
  async titleDelete(id: string) {
    try {
      const title = await this.prisma.title.delete({ where: { id } });
      if (!title) {
        throw new HttpException('Title not found', 404);
      }
      return title;
    } catch (error) {
      console.error(`[titleDelete]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async titleUpdate(titlePayload: UpdateTitleType) {
    try {
      const title = await this.prisma.title.update({
        where: { id: titlePayload.id },
        data: titlePayload,
      });
      if (!title) {
        throw new HttpException('Failed to update title', 500);
      }
      return title;
    } catch (error) {
      console.error(`[titleUpdate]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }
}
