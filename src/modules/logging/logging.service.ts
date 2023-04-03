/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 09:42:27
 * @LastEditTime: 2023-04-04 01:19:13
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\logging\logging.service.ts
 */
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger, LoggerOptions } from 'winston';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { UpdateLoggingDto } from './dto/update-logging.dto';
import { Logging } from './entities/logging.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoggingService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Logging) private repository: Repository<Logging>,
  ) {}

  async create(data: any): Promise<Logging> {
    return this.repository.save(data);
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
  async log(name: string, message: any): Promise<Logging> {
    this.logger.info(name, message.req);
    return this.repository.save({
      data: message.req,
    });
  }
  async error(name: string, message: any): Promise<Logging> {
    this.logger.error(name, message.req);
    return this.repository.save({
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
