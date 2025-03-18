import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { UpdateUserDto } from './dto/user.dto';
import { UserInclude } from 'src/types/userFields.types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    const users = await this.usersService.findAll({ accounts: true });
    return users;
  }

  @Get(':id')
  async getOne(id: string, @Query() query: UserInclude) {
    query.accounts = true,
    const user = await this.usersService.findOneById(id, {
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
