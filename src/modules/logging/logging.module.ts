import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [LoggingController],
  providers: [LoggingService, PrismaService],
})
export class LoggingModule {}
