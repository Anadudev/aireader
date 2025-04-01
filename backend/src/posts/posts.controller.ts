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
import { PostQueryType, ExtendedRequest } from 'src/types';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPost(
    @Body() formPayload: NewPostDto,
    @Request() req: ExtendedRequest,
  ) {
    const authorId = req.user?.id;
    const { titleId } = formPayload;
    // req['user'] = undefined;
    if (!authorId) {
      throw new UnauthorizedException();
    }
    // const payload = { authorId, ...formPayload };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = formPayload.chats.map(({ chatId, ...post }) => ({
      titleId,
      authorId,
      ...post,
    }));

    return await this.postsService.postCreate(formPayload.titleId, payload);
  }

  @Get()
  async getAllPosts(@Query() query: PostQueryType) {
    return await this.postsService.postFindAll(query);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postsService.postFindOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postsService.postDelete(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() formPayload: UpdatePostDto,
    @Request() req: ExtendedRequest,
  ) {
    const authorId = req?.user?.id;
    if (!authorId) {
      throw new UnauthorizedException();
    }

    const payload = { id, authorId, ...formPayload };
    return await this.postsService.postUpdate(payload);
  }
}
