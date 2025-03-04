import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    const users = await this.usersService.findAll({ accounts: true });
    return users;
  }

  @Get(':id')
  async getOne(id: string) {
    const user = await this.usersService.findOneById(id, {
      accounts: true,
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
