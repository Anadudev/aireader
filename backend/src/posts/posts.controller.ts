import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { NewPostDto, UpdatePostDto } from './dto/posts.dto';
import { User } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() data: NewPostDto, @Request() req) {
    const userId = (req.user as User).id;
    // req['user'] = undefined;
    if (!userId) {
      throw new UnauthorizedException();
    }
    const payload = { userId, ...data };
    return await this.postsService.create(payload);
  }

  @Get()
  async getAllPosts(@Query() query: { take: number; skip?: number }) {
    return await this.postsService.findAll(query.take, query.skip);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postsService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
    @Request() req,
  ) {
    const userId = (req.user as User).id;
    if (!userId) {
      throw new UnauthorizedException();
    }
    const payload = { id, userId, ...data };
    return await this.postsService.update(payload);
  }
}
