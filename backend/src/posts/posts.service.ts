import { HttpException, Injectable } from '@nestjs/common';
import { errorMessages } from 'errors/error-messages';
import { PrismaConfigService } from 'src/config/prisma.config.service';
import { NewPost, UpdatePost } from 'src/types/postFields.types';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaConfigService) {}

  async findAll(take = 10, skip?: number) {
    try {
      if (take < 1) take = 1;
      if (skip && skip < 0) skip = 0;
      const posts = await this.prisma.post.findMany({ take, skip });
      return posts;
    } catch (error) {
      console.error(`[findAll]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async findOne(id: string) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });
      if (!post) {
        throw new HttpException('Post not found', 404);
      }
      return post;
    } catch (error) {
      console.error(`[findOne]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async create(data: NewPost) {
    try {
      const post = await this.prisma.post.create({ data });
      if (!post) {
        throw new HttpException('Post not found', 404);
      }
      return post;
    } catch (error) {
      console.error(`[create]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async update(data: UpdatePost) {
    try {
      const post = await this.prisma.post.update({
        where: { id: data.id },
        data,
      });
      if (!post) {
        throw new HttpException('Post not found', 404);
      }
      return post;
    } catch (error) {
      console.error(`[update]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }

  async delete(id: string) {
    try {
      const post = await this.prisma.post.delete({ where: { id } });
      if (!post) {
        throw new HttpException('Post not found', 404);
      }
      return post;
    } catch (error) {
      console.error(`[delete]: ${error}`);
      errorMessages.SERVER_ERROR(error);
    }
  }
}
