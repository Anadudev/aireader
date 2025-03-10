import { HttpException, Injectable } from '@nestjs/common';
import { errorMessages } from 'errors/error-messages';
import { PrismaConfigService } from 'src/config/prisma.config.service';
import {
  NewPost,
  NewTitleType,
  PostInclude,
  UpdatePost,
  UpdateTitleType,
} from 'src/types/postFields.types';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaConfigService) {}

  async postFindAll(take = 10, skip?: number, include?: PostInclude) {
    try {
      if (take < 1) take = 1;
      if (skip && skip < 0) skip = 0;
      const posts = await this.prisma.post.findMany({ take, skip, include });
      return posts;
    } catch (error) {
      console.error(`[postFindAll]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async postFindOne(id: string, include?: PostInclude) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include,
      });
      if (!post) {
        throw new HttpException('Post not found', 404);
      }
      return post;
    } catch (error) {
      console.error(`[postFindOne]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async postCreate(titleId: string, postPayload: NewPost) {
    try {
      const title = await this.prisma.title.findUnique({
        where: { id: titleId },
      });

      if (!title) {
        throw new HttpException('Title not found', 404);
      }

      const post = await this.prisma.post.create({
        data: postPayload,
      });

      if (!post) {
        throw new HttpException('Failed to create post', 500);
      }

      return post;
    } catch (error) {
      console.error(`[postCreate]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

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

  async postUpdate(postPayload: UpdatePost) {
    try {
      if (!postPayload.response && !postPayload.prompt) {
        throw new HttpException('Prompt or response is required', 400);
      }
      const post = await this.prisma.post.update({
        where: { id: postPayload.id },
        data: postPayload,
      });
      if (!post) {
        throw new HttpException('Failed to update post', 500);
      }
      return post;
    } catch (error) {
      console.error(`[postUpdate]: ${error}`);
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

  async postDelete(id: string) {
    try {
      const post = await this.prisma.post.delete({ where: { id } });
      if (!post) {
        throw new HttpException('Post not found', 404);
      }
      return post;
    } catch (error) {
      console.error(`[postDelete]: ${error}`);
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
}
