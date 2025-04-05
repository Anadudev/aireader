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
import { AuthGuard } from 'src/auth/auth.guards';
import { NewTitleDto } from 'src/posts/dto/posts.dto';
import { TitlesService } from './titles.service';
import { TitleIncludeType, TitleQueryType, ExtendedRequest } from 'src/types';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

@Controller('titles')
export class TitlesController {
  constructor(private titlesService: TitlesService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createTitle(
    @Body() formPayload: NewTitleDto,
    @Request() req: ExtendedRequest,
  ) {
    const authorId = req.user?.id;
    // req['user'] = undefined;
    if (!authorId) {
      throw new UnauthorizedException();
    }
    const payload = {
      slug: `${slugify(formPayload.title, '-')}-${uuidv4()}`,
      authorId,
      ...formPayload,
    };

    return await this.titlesService.titleCreate(payload);
  }

  @Get()
  async getAllTitle(@Query() query: TitleQueryType) {
    // console.log(query);
    return await this.titlesService.titleFindAll(query);
  }

  @Get(':slug')
  async getTitle(
    @Query() include: TitleIncludeType,
    @Param('slug') slug: string,
  ) {
    return await this.titlesService.titleFindOne(slug, include);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTitle(@Param('id') id: string) {
    return await this.titlesService.titleDelete(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTitle(
    @Param('id') id: string,
    @Body() formPayload: NewTitleDto,
    @Request() req: ExtendedRequest,
  ) {
    const authorId = req.user?.id;
    if (!authorId) {
      throw new UnauthorizedException();
    }

    const payload = {
      id,
      authorId,
      ...formPayload,
    };
    return await this.titlesService.titleUpdate(id, payload);
  }
}
