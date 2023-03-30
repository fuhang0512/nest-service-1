import { AnyExceptionFilter } from './common/filters/any-exception.filter';
/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 18:29:44
 * @LastEditTime: 2023-03-30 17:25:41
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\app.module.ts
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggingModule } from './modules/logging/logging.module';
import { LoggingService } from './modules/logging/logging.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.json(),
            winston.format.ms(),
            winston.format.timestamp({
              format: 'YYYY/MM/DD HH:mm:ss',
            }),
            nestWinstonModuleUtilities.format.nestLike('CustomLogger', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.DailyRotateFile({
          level: 'error',
          dirname: `logs/error`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: `logs/info`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          ),
        }),
      ],
    }),
    AuthModule,
    UserModule,
    LoggingModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    LoggingService,
    PrismaService,
    // 应用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // 应用全局过滤器
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
