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
import { NewPostDto, NewTitleDto, UpdatePostDto } from './dto/posts.dto';
import { User } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post('/title')
  async createTitle(@Body() formPayload: NewTitleDto, @Request() req) {
    const authorId = (req.user as User).id;
    // req['user'] = undefined;
    if (!authorId) {
      throw new UnauthorizedException();
    }
    const payload = { authorId, ...formPayload };

    return await this.postsService.titleCreate(payload);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() formPayload: NewPostDto, @Request() req) {
    const authorId = (req.user as User).id;
    // req['user'] = undefined;
    if (!authorId) {
      throw new UnauthorizedException();
    }
    const payload = { authorId, ...formPayload };

    return await this.postsService.postCreate(formPayload.titleId, payload);
  }

  @Get()
  async getAllPosts(@Query() query: { take: number; skip?: number }) {
    return await this.postsService.postFindAll(query.take, query.skip);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postsService.postFindOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/title/:id')
  async deleteTitle(@Param('id') id: string) {
    return await this.postsService.titleDelete(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postsService.postDelete(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/title/:id')
  async updateTitle(
    @Param('id') id: string,
    @Body() formPayload: NewTitleDto,
    @Request() req,
  ) {
    const authorId = (req.user as User).id;
    if (!authorId) {
      throw new UnauthorizedException();
    }

    const payload = { id, authorId, ...formPayload };
    return await this.postsService.titleUpdate(payload);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() formPayload: UpdatePostDto,
    @Request() req,
  ) {
    const authorId = (req.user as User).id;
    if (!authorId) {
      throw new UnauthorizedException();
    }

    const payload = { id, authorId, ...formPayload };
    return await this.postsService.postUpdate(payload);
  }
}
