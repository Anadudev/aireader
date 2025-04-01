import { HttpException, Injectable } from '@nestjs/common';
import { errorMessages } from 'errors/error-messages';
import { PrismaConfigService } from 'src/config/prisma.config.service';
import {
  NewTitleType,
  UpdateTitleType,
  TitleIncludeType,
  TitleQueryType,
} from 'src/types';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

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

  async titleFindAll(queries?: TitleQueryType) {
    try {
      const titles = await this.prisma.title.findMany({
        take: Number(queries?.take || 10),
        skip: Number(queries?.skip || 0),
        include: {
          posts: Boolean(queries?.posts),
        },
      });
      return titles;
    } catch (error) {
      console.error(`[postFindAll]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async titleFindOne(slug: string, include?: TitleIncludeType) {
    try {
      const title = await this.prisma.title.findUnique({
        where: { slug },
        include: {
          posts: Boolean(include?.posts || false),
          author: Boolean(include?.author || false),
        },
      });
      if (!title) {
        throw new HttpException('Title not found', 404);
      }
      return title;
    } catch (error) {
      console.error(`[titleFindOne]: ${error}`);
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

  async titleUpdate(id: string, titlePayload: UpdateTitleType) {
    try {
      titlePayload.slug = `${slugify(titlePayload.title, '-')}${uuidv4()}`;
      const title = await this.prisma.title.update({
        where: { id },
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
