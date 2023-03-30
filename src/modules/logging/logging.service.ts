/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 09:42:27
 * @LastEditTime: 2023-03-30 17:47:46
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\logging\logging.service.ts
 */
import { PrismaService } from '@/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { Log, Prisma } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger, LoggerOptions } from 'winston';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { UpdateLoggingDto } from './dto/update-logging.dto';

@Injectable()
export class LoggingService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(data: any): Promise<Log> {
    // return 'This action adds a new logging';
    console.log('走了这里没有');
    return this.prismaService.log.create({
      data,
    });
  }

  // findAll() {
  //   return `This action returns all logging`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} logging`;
  // }

  // update(id: number, updateLoggingDto: UpdateLoggingDto) {
  //   return `This action updates a #${id} logging`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} logging`;
  // }
  async log(name: string, message: any): Promise<Log> {
    this.logger.info(name, message.req);
    return this.prismaService.log.create({
      data: message.req,
    });
  }
  error(name: string, message: any) {
    this.logger.error(name, message.req);
    return this.prismaService.log.create({
      data: message.req,
    });
  }
  warn(name: string, message: any) {
    this.logger.warn(name, message);
  }
  debug(name: string, message: any) {
    this.logger.debug(name, message);
  }
  verbose(name: string, message: any) {
    this.logger.verbose(name, message);
  }
}
