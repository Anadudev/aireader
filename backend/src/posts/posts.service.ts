import { HttpException, Injectable } from '@nestjs/common';
import { errorMessages } from 'errors/error-messages';
import { PrismaConfigService } from 'src/config/prisma.config.service';
import { NewPost, PostInclude, UpdatePost } from 'src/types/postFields.types';
import { PostQueryType } from 'src/types/postQuery.types';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaConfigService) {}

  async postFindAll(query: PostQueryType) {
    try {
      const posts = await this.prisma.post.findMany({
        where: { titleId: query.titleId },
        take: Number(query.take || 10),
        skip: Number(query.skip || 0),
      });
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

  async postCreate(titleId: string, postPayload: NewPost[]) {
    try {
      // console.log(titleId, postPayload);
      // return;
      const title = await this.prisma.title.findUnique({
        where: { id: titleId },
      });

      if (!title) {
        throw new HttpException('Title not found', 404);
      }

      const post = await this.prisma.post.createMany({
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
}
