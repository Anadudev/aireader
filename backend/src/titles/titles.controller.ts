import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Request,
  UseGuards,
  Get,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guards';
import { NewTitleDto } from 'src/posts/dto/posts.dto';
import { TitlesService } from './titles.service';

@Controller('titles')
export class TitlesController {
  constructor(private titlesService: TitlesService) {}
  @UseGuards(AuthGuard)
  @Post('/titles')
  async createTitle(@Body() formPayload: NewTitleDto, @Request() req) {
    const authorId = (req.user as User).id;
    // req['user'] = undefined;
    if (!authorId) {
      throw new UnauthorizedException();
    }
    const payload = { authorId, ...formPayload };

    return await this.titlesService.titleCreate(payload);
  }

  @Get()
  async getAllTitle(@Query() query: { take: number; skip?: number }) {
    return await this.titlesService.titleFindAll(query.take, query.skip);
  }

  @UseGuards(AuthGuard)
  @Delete('/titles/:id')
  async deleteTitle(@Param('id') id: string) {
    return await this.titlesService.titleDelete(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/titles/:id')
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
    return await this.titlesService.titleUpdate(payload);
  }
}
