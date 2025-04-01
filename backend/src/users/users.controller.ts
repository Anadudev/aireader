import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { UpdateUserDto } from './dto/user.dto';
import { UserInclude, QueryType } from 'src/types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(@Query() query: QueryType) {
    const users = await this.usersService.findAll(query);
    return users;
  }
  // todo: exclude accounts on every request
  @Get(':id')
  async getOne(@Param('id') id: string, @Query() query: UserInclude) {
    query.accounts = true;
    const user = await this.usersService.findOne(id, {
      ...query,
    });
    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(id: string, @Body() data: UpdateUserDto) {
    const user = await this.usersService.update(id, data);
    return user;
  }
}
