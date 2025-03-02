import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaConfigService } from 'src/config/prisma.config.service';

@Module({
  providers: [UsersService, PrismaConfigService],
  exports: [UsersService],
})
export class UsersModule {
  // constructor(private usersService: UsersService) {}
  // async signUp() {
  //   return this.usersService.create();
  // }
}
