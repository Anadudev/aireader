import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { NewPost, UpdatePost } from 'src/interfaces/postFields.interface';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('posts')
  async getAllPosts(@Query() query: { take: number; skip?: number }) {
    return await this.postsService.findAll(query.take, query.skip);
  }

  @Get('post/:id')
  async getPost(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }

  @Delete('delete/:id')
  async deletePost(@Param('id') id: string) {
    return await this.postsService.delete(id);
  }

  @Post('create')
  async createPost(@Query('title') data: NewPost) {
    return await this.postsService.create(data);
  }

  @Patch('update/:id')
  async updatePost(@Param('id') id: string, @Body() data: UpdatePost) {
    return await this.postsService.update(data);
  }
}
