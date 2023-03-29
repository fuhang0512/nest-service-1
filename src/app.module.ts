/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 18:29:44
 * @LastEditTime: 2023-03-30 02:00:09
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
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggingModule } from './modules/logging/logging.module';
import { LoggingService } from './modules/logging/logging.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
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
        new winston.transports.File({
          dirname: `logs`, // 日志保存的目录
          filename: 'error.log', // 日志名称
          level: 'error',
        }),
        new winston.transports.File({
          dirname: `logs`, // 日志保存的目录
          filename: 'combined.log', // 日志名称
        }),
      ],
    }),
    AuthModule,
    UserModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [
    // 应用全局过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // 应用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    LoggingService,
  ],
})
export class AppModule {}
