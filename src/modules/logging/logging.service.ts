/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 01:54:31
 * @LastEditTime: 2023-03-30 02:01:43
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\logging\logging.service.ts
 */
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger, LoggerOptions } from 'winston';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { UpdateLoggingDto } from './dto/update-logging.dto';

@Injectable()
export class LoggingService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  create(createLoggingDto: CreateLoggingDto) {
    return 'This action adds a new logging';
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
  log(name: string, message: any) {
    this.logger.info(name, message);
  }
  error(name: string, message: any) {
    this.logger.error(name, message);
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
