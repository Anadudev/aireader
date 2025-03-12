import { Module } from '@nestjs/common';
import { TitlesController } from './titles.controller';
import { TitlesService } from './titles.service';
import { PrismaConfigService } from 'src/config/prisma.config.service';
@Module({
  controllers: [TitlesController],
  providers: [TitlesService, PrismaConfigService],
})
export class TitlesModule {}
