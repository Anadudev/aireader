import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaConfigService } from 'src/config/prisma.config.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaConfigService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
