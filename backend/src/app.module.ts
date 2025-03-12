import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaConfigService } from './config/prisma.config.service';
import { PostsModule } from './posts/posts.module';
import { TitlesModule } from './titles/titles.module';

@Module({
  imports: [AuthModule, UsersModule, PostsModule, TitlesModule],
  controllers: [AppController],
  providers: [AppService, PrismaConfigService],
})
export class AppModule {}
