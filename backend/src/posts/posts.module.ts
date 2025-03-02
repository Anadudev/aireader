import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaConfigService } from 'src/config/prisma.config.service';

@Module({
  providers: [PostsService, PrismaConfigService],
  controllers: [PostsController],
})
export class PostsModule {}
